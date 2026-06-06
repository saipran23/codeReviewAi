import axios from "axios";
import express, { response } from "express";

const gitUrl = "https://api.github.com";

function getGitHubHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function handleGitHubError(error) {
  if (!error.response) {
    throw new Error("Unable to connect to GitHub.");
  }

  const status = error.response.status;

  const errorMessages = {
    401: "GitHub authentication failed. Invalid or expired access token.",
    403: "GitHub API access forbidden. Check repository permissions.",
    404: "Pull request not found. Verify the PR URL.",
    429: "GitHub API rate limit exceeded. Please try again later.",
  };

  throw new Error(
    errorMessages[status] ||
      `GitHub API error (${status}): ${
        error.response.data?.message || "Unknown error"
      }`,
  );
}

function parsePrUrl(prUrl) {
  const match = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);

  if (!match) throw new Error("Invalid GitHub PR URL");

  return {
    owner: match[1],
    repo: match[2],
    prNumber: match[3],
  };
}

async function fetchPRDiff(prUrl, accessToken) {
  try {
    const { owner, repo, prNumber } = parsePrUrl(prUrl);

    const response = await axios.get(
      `${gitUrl}/repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: {
          ...getGitHubHeaders(accessToken),
          Accept: "application/vnd.github.diff",
        },
      },
    );

    return {
      diff: response.data,
      repoName: `${owner}/${repo}`,
    };
  } catch (error) {
    handleGitHubError(error);
  }
}
async function getUserRepos(accessToken) {
  try {
    const response = await axios.get(`${gitUrl}/user/repos`, {
      headers: getGitHubHeaders,

      params: {
        sort: "updated",
        per_page: 20,
      },
    });

    return response.data.map((repo) => ({
      name: repo.full_name,
      url: repo.html_url,
      isPrivate: repo.private,
    }));
  } catch (error) {
    handleGitHubError(error);
  }
}
