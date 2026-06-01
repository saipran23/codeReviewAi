import express from "express";
import jwt from "jsonwebtoken";

function extractBearerToken(req) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice("Bearer ".length).trim();
}

function requireAuth(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Missing JWT_SECRET" });
  }
  const token = extractBearerToken(req);

  if (!token) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Missing/Invalid/Expired token authorization header" });
  }
}

export { extractBearerToken, requireAuth };
