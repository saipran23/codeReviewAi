import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

const GITHUB_AUTH_URL = "http://localhost:3000/api/auth/github";

const cardStyle = {
  backgroundColor: "#0d1117",
  borderColor: "#21262d",
};

const stepBadgeStyle = {
  width: 32,
  height: 32,
  backgroundColor: "#22c55e",
  fontSize: 14,
};

export default function LandingPage() {
  const navigate = useNavigate();
  function handleGitHubLogin() {
    window.location.href = GITHUB_AUTH_URL;
  }

  return (
    <div className="bg-black text-white min-vh-100 mt-5">
      {/* Hero */}
      <section className="container min-vh-100 d-flex align-items-center align-self-center justify-content-center px-4 px-lg-5 py-5 py-lg-6 text-center" id="cta">
        <div className="mx-auto" style={{ maxWidth: 820 }}>
          <p
            className="text-uppercase small mb-4"
            style={{ letterSpacing: "0.15em", color: "#8b949e" }}
          >
            AI-POWERED CODE REVIEW
          </p>
          <h1
            className="display-4 fw-bold mb-4"
            style={{ lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Get a senior code review on every{" "}
            <span style={{ color: "#22c55e" }}>pull request</span>
          </h1>
          <p className="lead mb-0 mx-auto" style={{ color: "#8b949e", maxWidth: 640 }}>
            Paste a GitHub PR link. PRReview.ai reads the diff, finds security
            risks, bugs, and performance issues, and explains exactly how to fix
            them — in under a minute.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
            <button
              type="button"
              className="btn btn-outline-light px-4 py-2 rounded-pill"
              onClick={handleGitHubLogin}
            >
              Login with GitHub
            </button>

            <button
              type="button"
              className="btn btn-outline-light px-4 py-2 rounded-pill"
              onClick={ () => navigate("/") }
            >
              Home Page
            </button>
            <a
              href="#how"
              className="btn btn-outline-light px-4 py-2 rounded-pill"
            >
              See an example review
            </a>
          </div>
          <p className="small mt-4 mb-0" style={{ color: "#484f58" }}>
            Free — 5 reviews per month, no credit card required
          </p>
        </div>
      </section>



      <section
        className="container px-4 px-lg-5 py-5 border-top"
        id="how"
        style={{ borderColor: "#21262d" }}
      >
        <h2 className="display-6 fw-semibold mb-3">What the app is at its core</h2>
        <p className="mb-5" style={{ color: "#8b949e", maxWidth: 760 }}>
          A middleman between GitHub and an AI. You give it a GitHub PR link →
          it pulls the code diff → feeds it to Groq AI → shows you the feedback
          in a clean UI attached to specific lines.
        </p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark mb-3"
                style={stepBadgeStyle}
              >
                1
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">Paste the PR link</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                Submit any GitHub pull request URL from your repos.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark mb-3"
                style={stepBadgeStyle}
              >
                2
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">We pull the diff</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                The backend fetches the changed files via the GitHub API.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark mb-3"
                style={stepBadgeStyle}
              >
                3
              </div>
              <h3 className="h5 fw-semibold text-white mb-2">Groq reviews it</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                The diff is sent to Groq, which returns issues tagged by file and line.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="container px-4 px-lg-5 py-5 border-top" style={{ borderColor: "#21262d" }}>
        <p
          className="text-uppercase small mb-4"
          style={{ letterSpacing: "0.15em", color: "#8b949e" }}
        >
          What it checks
        </p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <span className="fs-5 mb-2 d-block">🔒</span>
              <h3 className="h5 fw-semibold text-white mb-2">Security</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                SQL injection, exposed secrets, weak auth, timing attacks.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <span className="fs-5 mb-2 d-block">⚡</span>
              <h3 className="h5 fw-semibold text-white mb-2">Performance</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                N+1 queries, unnecessary loops, inefficient data fetching.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <span className="fs-5 mb-2 d-block">🐛</span>
              <h3 className="h5 fw-semibold text-white mb-2">Bugs</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                Logic errors, edge cases, null/undefined handling.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border rounded-3 p-4" style={cardStyle}>
              <span className="fs-5 mb-2 d-block">🎨</span>
              <h3 className="h5 fw-semibold text-white mb-2">Style</h3>
              <p className="mb-0 small" style={{ color: "#8b949e" }}>
                Naming, structure, and best-practice violations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core flow */}




      {/* Final CTA */}
      <section
        className="container px-4 px-lg-5 py-5 py-lg-6 border-top text-center"
        style={{ borderColor: "#21262d" }}
      >
        <h2 className="display-6 fw-semibold mb-3">Ready to ship better PRs?</h2>
        <p className="mb-4 mx-auto" style={{ color: "#8b949e", maxWidth: 480 }}>
          Sign in with GitHub and review your first pull request.
        </p>
        <button
          type="button"
          className="btn btn-light px-5 py-2 fw-medium"
          onClick={handleGitHubLogin}
        >
          Sign in with GitHub
        </button>
      </section>

      {/* Footer */}
      <footer
        className="container-fluid px-4 px-lg-5 py-4 border-top d-flex flex-column flex-sm-row justify-content-between gap-2 small"
        style={{ borderColor: "#21262d", color: "#484f58" }}
      >
        <span>© 2026 PRReview.ai</span>
      </footer>
    </div>
  );
}
