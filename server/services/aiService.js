import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../.env" });

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function reviewCode(formattedDiff) {
  const systemPrompt = `
You are a senior software engineer performing a pull request code review.

Analyze the provided code changes and identify:
1. Bugs
2. Security vulnerabilities
3. Performance issues
4. Code quality problems
5. Best practice violations

Return ONLY valid JSON — no markdown, no explanations outside the object.

Response format:
{
  "summary": "Overall assessment in 2-4 sentences.",
  "score": 0,
  "risk": "low",
  "recommendation": "Merge | Merge after fixes | Requires significant changes | Do not merge",
  "comments": [
    {
      "file_name": "string",
      "line_number": 0,
      "category": "security | performance | bug | style",
      "severity": "critical | high | medium | low",
      "message": "Short description of the issue.",
      "why_it_matters": "One sentence explaining the real-world impact or risk of this issue.",
      "offending_code": "The exact problematic code snippet (as a plain string, 1-5 lines).",
      "suggested_fix": "The corrected code snippet showing how to fix it (as a plain string)."
    }
  ]
}

Rules:
- score must be an integer from 0 to 100 (100 = perfect code).
- risk must be one of: "low", "medium", "high".
- recommendation must be one of the four options above exactly.
- message must be short (1 sentence max).
- why_it_matters must explain the real-world consequence simply.
- offending_code must be the EXACT lines from the diff causing the issue.
- suggested_fix must be a working corrected code snippet.
- offending_code and suggested_fix must be plain strings — no markdown, no backticks.
- comments must list every issue found.
- Use empty array [] if no issues found.
- Return ONLY the JSON object.

If no issues found:
{
  "summary": "The pull request is well-structured and follows best practices with no significant issues detected.",
  "score": 95,
  "risk": "low",
  "recommendation": "Merge",
  "comments": []
}
`;

  const responcse = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: formattedDiff,
      },
    ],
    max_tokens: 2000,
  });

  const text = responcse.choices[0].message.content;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\[.*\]/s);
    return match ? JSON.parse(match[0]) : [];
  }
}

export default reviewCode;
