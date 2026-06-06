import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <main>
        <section className="hero">
          <p className="eyebrow">AI CODE REVIEW · POWERED BY GROQ</p>
          <h1>
            Paste a GitHub PR link.
            <br />
            Get a senior-level review in seconds.
          </h1>
          <p className="lede">
            A middleman between GitHub and an AI. We pull the diff, feed it to
            Groq, and return clean, line-by-line feedback attached to the exact
            files and line numbers in your pull request.
          </p>
          <div className="cta-row" id="cta">
            <a href="#" className="btn btn-primary">Sign in with GitHub</a>
            <a href="#how" className="btn btn-ghost">See how it works →</a>
          </div>
        </section>

        <section className="section" id="how">
          <h2>What the app is at its core</h2>
          <p className="body">
            A middleman between GitHub and an AI. You give it a GitHub PR link →
            it pulls the code diff → feeds it to Groq AI → shows you the
            feedback in a clean UI attached to specific lines.
          </p>
          <div className="grid grid-3">
            <div className="card">
              <div className="card-num">01</div>
              <h3>Paste the PR link</h3>
              <p>Submit any GitHub pull request URL from your repos.</p>
            </div>
            <div className="card">
              <div className="card-num">02</div>
              <h3>We pull the diff</h3>
              <p>The backend fetches the changed files via the GitHub API.</p>
            </div>
            <div className="card">
              <div className="card-num">03</div>
              <h3>Groq reviews it</h3>
              <p>The diff is sent to Groq, which returns issues tagged by file and line.</p>
            </div>
          </div>
        </section>

        <section className="section" id="security">
          <p className="eyebrow">// SECURITY MODEL</p>
          <h2>Security is layered.</h2>
          
          <ul className="sec-checklist">
            <li><span className="chk">✓</span> Passwords never hit our servers</li>
            <li><span className="chk">✓</span> Tokens stored httpOnly, rotated on refresh</li>
            <li><span className="chk">✓</span> Row-level isolation enforced in the database</li>
            <li><span className="chk">✓</span> No diff is persisted after the review completes</li>
          </ul>
        </section>

        <section className="section final">
          <h2>Ready to ship better PRs?</h2>
          <p className="body">Sign in with GitHub and review your first pull request.</p>
          <a href="#" className="btn btn-primary">Sign in with GitHub</a>
        </section>
      </main>

      <footer className="landing-footer">
        <span>© 2026 PRReview.ai</span>
        <span>Built with GitHub · Groq</span>
      </footer>
    </div>
  );
}
