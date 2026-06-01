import express from "express";
import rateLimit from "express-rate-limit";

import { requireAuth } from "../middleware/auth.js";
import { Review } from "../models/index.js";

const router = express.Router();

const protectedRouteRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});



router.get("/", async (req, res) => {
  const reviews = await Review.findAll({
     order: [['createdAt', 'DESC']],
  });
  res.json(reviews);
});

router.get("/mine", protectedRouteRateLimit, requireAuth , async (req, res) =>{

    const userId =  Number(req.user.sub);

    if (!Number.isInteger(userId)) {
    return res.status(401).json({ error: 'Invalid token subject' });
  }

    const reviews = await Review.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });

  res.json(reviews);
});

router.post("/", protectedRouteRateLimit, requireAuth, async (req, res) =>{
    const userId = Number(req.user.sub);
    if (!Number.isInteger(userId)) {
        return res.status(401).json({ error: 'Invalid token subject' });
    }

    const { prUrl, diffText, status } = req.body;
    if (!prUrl || !diffText || !status) {
        return res.status(400).json({ error: 'prUrl, diffText, and status are required' });
    }

    const review  = await Review.create({userId: userId, prUrl : prUrl, diffText: diffText, status: status});
    return res.status(201).json(review);
});


export default router;