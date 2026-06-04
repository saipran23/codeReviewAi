import express from "express";
import axios from "axios";
import { rateLimit } from "express-rate-limit";

import jwt from "jsonwebtoken";
import crypto from "crypto";

import client from "../config/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});

router.use(authRateLimit);

function getCallbackUrl(req) {
  if (process.env.GITHUB_CALLBACK_URL) {
    return process.env.GITHUB_CALLBACK_URL;
  }

  return `${req.protocol}://${req.get("host")}/api/auth/callback`;
}

function getFrontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:5173";
}

function createStateToken() {
  return jwt.sign(
    { nonce: crypto.randomBytes(16).toString("hex") },
    process.env.JWT_SECRET,
    { expiresIn: "10m" },
  );
}

function createAppToken(user) {
  return jwt.sign(
    {
      sub: String(user.id),
      username: user.login,
      avatar_url: user.avatar_url,
      profile_url: user.html_url,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
}

router.get("/github", async (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: getCallbackUrl(req),
    scope: "read:user user:email",
    state: createStateToken(),
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

router.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) {
    return res
      .status(400)
      .json({ error: "Missing required query parameters: code and state" });
  }

  try {
    jwt.verify(String(state), process.env.JWT_SECRET);

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: getCallbackUrl(req),
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!tokenResponse.data.access_token) {
      return res.status(401).json({ error: "GitHub token exchange failed" });
    }

    console.log(tokenResponse.data);

    const githubAccessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: ["Bearer", githubAccessToken].join(" "),
        Accept: "application/vnd.github+json",
      },
    });

    const user = userResponse.data;

    const emailsResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: ["Bearer", githubAccessToken].join(" "),
          Accept: "application/vnd.github+json",
        },
      },
    );
    const primaryEmail = emailsResponse.data.find(
      (entry) => entry.primary,
    )?.email;
    const email =
      user.email || primaryEmail || `${user.login}@users.noreply.github.com`;

    await client.query(
      `
  INSERT INTO users (
    github_id,
    username,
    email,
    access_token,
    avatar_url
  )
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (github_id)
  DO UPDATE SET
    username = EXCLUDED.username,
    email = EXCLUDED.email,
    access_token = EXCLUDED.access_token,
    avatar_url = EXCLUDED.avatar_url
  RETURNING *;
  `,
      [String(user.id), user.login, email, githubAccessToken, user.avatar_url],
    );

    const result = await client.query(
      `SELECT * FROM users WHERE github_id = $1`,
      [String(user.id)],
    );

    const dbUser = result.rows[0];
    if (!dbUser) {
      return res.status(500).json({ error: "Failed to persist user profile" });
    }

    const appToken = createAppToken({
      id: dbUser.id,
      login: dbUser.username,
      avatar_url: user.avatar_url || null,
      html_url: user.html_url || null,
    });
    // const redirectUrl = new URL(getFrontendUrl());
    // redirectUrl.searchParams.set("token", appToken);

    // console.log("Redirecting to:", redirectUrl.toString());

    // return res.redirect(redirectUrl.toString());
    return res.json({
      token: appToken,
      user: {
        id: dbUser.id,
        username: dbUser.username,
      },
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired OAuth state" });
    }

    return res.status(500).json({ error: "GitHub OAuth callback failed" });
  }
});



router.get("/me", requireAuth, (req, res) => {
  return res.json({
    id: req.user.sub,
    username: req.user.username,
    avatar_url: req.user.avatar_url,
    profile_url: req.user.profile_url,
  });
});

export default router;
