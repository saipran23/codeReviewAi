import React from "react";
import client from "../config/database";
import { requireAuth } from "../middleware/auth";
import reviewCode from "../services/aiService";
import {parseDiff, formatForAI} from "../services/diffParser";
import {fetchPRDiff, getUserRepos} from "../services/githubService";1

const router = express.Router();


router.post("/", requireAuth, (req, res) => {

    const {pr_url} = req.body;

    if(!pr_url) res.status(400).json({error : 'PR Url requried'});

    try{

        const result = await client.query(
            'INSERT INTO reviews (user_id,pr_url, status) VALUES ($1, $2, $3) RETURNING id', 
            [req.userId,  pr_url, 'processing']
        );

        const reviewId = result.rows[0].id;

        res.json({review_id: reviewId, status: 'processing'});

        setImmediate(async ()=>{

            try{

                const userResult = await client.query(
                    `SELECT access_token FROM users WHERE id =  $1 `,
                    [req.userId]
                );

                const access_token = userResult.rows[0].access_token;

                const {diff, repoName } = fetchPRDiff(pr_url, access_token);
                const parseDiff = parseDiff(PRDiff);

                const formattedDiff = formatForAI(parseDiff);

                const comments =  await reviewCode(formattedDiff);

                for (const comment of comments) {
                    await db.query(
                        'INSERT INTO review_comments (review_id, file_name, line_number, category, severity, message) VALUES ($1,$2,$3,$4,$5,$6)',
                        [
                        reviewId,
                        comment.file_name,
                        comment.line_number,
                        comment.category,
                        comment.severity,
                        comment.message
                        ]
                    );
                }

                await db.query(
                    'UPDATE reviews SET status=$1, repo_name=$2, completed_at=NOW() WHERE id=$3',
                    ['completed', repoName, reviewId]
                );


            }catch(error){
                console.error('AI review failed:', err);
                await db.query(
                    'UPDATE reviews SET status=$1 WHERE id=$2',
                    ['failed', reviewId]
                );

            }
        })


    }catch(error){
         console.error(err);

        res.status(500).json({
            error: 'Failed to create review'
        });
    }

});


export default router;