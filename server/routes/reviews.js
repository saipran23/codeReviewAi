import client from "../config/database.js";
import { requireAuth } from "../middleware/auth.js";
import reviewCode from "../services/aiService.js";
import { parseDiff, formatForAI } from "../services/diffParser.js";
import { fetchPRDiff, getUserRepos } from "../services/githubService.js";
import express from "express";

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  const { pr_url } = req.body;
  // console.log(pr_url);
  if (!pr_url) return res.status(400).json({ error: "PR Url requried" });

  try {
    const result = await client.query(
      "INSERT INTO reviews (user_id,pr_url, status) VALUES ($1, $2, $3) RETURNING id",
      [req.user.sub, pr_url, "processing"],
    );

    const reviewId = result.rows[0].id;

    res.json({ review_id: reviewId, status: "processing" });

    setImmediate(async () => {
      try {
        const userResult = await client.query(
          `SELECT access_token FROM users WHERE id =  $1 `,
          [req.user.sub],
        );

        const access_token = userResult.rows[0].access_token;

        const { diff, repoName } = await fetchPRDiff(pr_url, access_token);
        const parseDifft = await parseDiff(diff);

        const formattedDifft = await formatForAI(parseDifft);

        const review = await reviewCode(formattedDifft);

        await client.query(
          `
          UPDATE reviews
          SET diff_text = $1
          WHERE id = $2
          `,
          [formattedDifft, reviewId],
        );

        await client.query(
          `
                UPDATE reviews
                SET
                    review_summary = $1,
                    code_quality_score = $2,
                    risk_level = $3,
                    recommendation = $4
                WHERE id = $5
                `,
          [
            review.summary,
            review.score,
            review.risk,
            review.recommendation,
            reviewId,
          ],
        );

        const reviewComments = review.comments || [];

        for (const comment of reviewComments) {
          await client.query(
            `INSERT INTO review_comments
             (review_id, file_name, line_number, category, severity, message,
              why_it_matters, offending_code, suggested_fix)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              reviewId,
              comment.file_name,
              comment.line_number,
              comment.category,
              comment.severity,
              comment.message,
              comment.why_it_matters || null,
              comment.offending_code || null,
              comment.suggested_fix || null,
            ],
          );
        }

        await client.query(
          "UPDATE reviews SET status=$1, repo_name=$2, completed_at=NOW() WHERE id=$3",
          ["completed", repoName, reviewId],
        );
      } catch (error) {
        console.error("AI review failed:", error);
        await client.query("UPDATE reviews SET status=$1 WHERE id=$2", [
          "failed",
          reviewId,
        ]);
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create review",
    });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.sub],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch review",
    });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await client.query(
      "SELECT * FROM reviews WHERE user_id = $1 AND id = $2",
      [req.user.sub, reviewId],
    );

    if (!result.rows.length)
      return res.status(404).json({ error: "not found" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error(err);

    res.status(500).json({
      error: `Failed to fetch ${reviewId} review`,
    });
  }
});

router.get("/:id/comments", requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  try {
    const response = await client.query(
      "SELECT * FROM reviews WHERE user_id = $1 AND id = $2",
      [req.user.sub, reviewId],
    );

    if (!response.rows.length)
      return res.status(404).json({ error: "not found" });

    const result = await client.query(
      "SELECT * FROM review_comments WHERE review_id = $1 ORDER BY severity, line_number",
      [reviewId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(err);

    res.status(500).json({
      error: `Failed to fetch ${reviewId} review comments`,
    });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  try {
    await db.query(`DELECT FROM reviews WHERE user_id = $1 AND id = $2`, [
      req.user.sub,
      reviewId,
    ]);

    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(err);

    res.status(500).json({
      error: `Failed to delete ${reviewId} review`,
    });
  }
});

export default router;
