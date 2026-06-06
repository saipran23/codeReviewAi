import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../.env" });

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function reviewCode(formattedDiff) {
  const systemPrompt = `
    You are a senior software engineer performing a pull request review.

    Analyze the provided code changes and identify:

    1. Bugs
    2. Security vulnerabilities
    3. Performance issues
    4. Code quality problems
    5. Best practice violations

    Return ONLY a valid JSON array.

    Each issue must have:

    {
    "file_name": string,
    "line_number": number,
    "category": "security" | "performance" | "bug" | "style",
    "severity": "critical" | "high" | "medium" | "low",
    "message": string
    }

    If no issues are found, return:

    []
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

  const text = responcse.choices[0].content;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\[.*\]/s);
    return match ? JSON.parse(match[0]) : [];
  }
}

export default reviewCode;