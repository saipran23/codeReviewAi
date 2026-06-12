import ScoreCircle from "./ScoreCircle";



function ReviewSummary({ comments, qualityScore, riskLevel }) {
    const score = qualityScore;


    function getGrade(score) {
        if (typeof score !== "number" || isNaN(score)) {
            return "Invalid Score";
        }

        if (score < 0 || score > 100) {
            return "Score must be between 0 and 100";
        }

        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }

    const issues = comments;

    const critical = issues.filter(i => i.severity === "critical").length;
    const high = issues.filter(i => i.severity === "high").length;
    const medium = issues.filter(i => i.severity === "medium").length;
    const low = issues.filter(i => i.severity === "low").length;

    const security = issues.filter(i => i.category === "security").length;
    const performance = issues.filter(i => i.category === "performance").length;
    const bug = issues.filter(i => i.category === "bug").length;
    const style = issues.filter(i => i.category === "style").length;

    const totalIssues = comments.length;

    const totalFiles = new Set(
        comments.map(comment => comment.file_name)
    ).size;

    return (
        <div className="container-fluid mt-4">

            <div className="row g-3">

                {/* Left Card */}

                <div className="col-12 col-xl-4">

                    <div className="border border-secondary h-100 p-4">

                        <div className="d-flex flex-column flex-md-row align-items-center gap-4">

                            <ScoreCircle score={score} />

                            <div>

                                <p
                                    className="text-uppercase mb-2"
                                    style={{
                                        letterSpacing: "4px",
                                        fontSize: "12px",
                                        color: "#9ca3af"
                                    }}
                                >
                                    Code Quality
                                </p>

                                <h1
                                    className="fw-bold mb-2"
                                    style={{ fontSize: "3rem" }}
                                >
                                    Grade {getGrade(score)}
                                </h1>

                                <p
                                    className="text-secondary mb-4"
                                    style={{ fontSize: "1.25rem" }}
                                >
                                    {totalIssues} issue{totalIssues > 1 ? "s" : ""} across{" "}
                                    {totalFiles} file{totalFiles > 1 ? "s" : ""}
                                </p>

                                <span
                                    className="border border-light px-3 py-2 text-uppercase"
                                    style={{
                                        letterSpacing: "3px",
                                        fontSize: "14px"
                                    }}
                                >
                                    Risk · {riskLevel}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Grid */}

                <div className="col-12 col-xl-8">

                    <div className="row g-0">

                        {/* Severity */}

                        {[
                            ["Critical", critical],
                            ["High", high],
                            ["Medium", medium],
                            ["Low", low]
                        ].map(([label, count]) => (
                            <div key={label} className="col-6 col-md-3">
                                <div
                                    className="border border-secondary p-4"
                                    style={{ minHeight: "120px" }}
                                >
                                    <p
                                        className="text-uppercase"
                                        style={{
                                            letterSpacing: "4px",
                                            fontSize: "12px",
                                            color: "#9ca3af"
                                        }}
                                    >
                                        ● {label}
                                    </p>

                                    <h1 className="fw-bold mt-3">
                                        {count}
                                    </h1>
                                </div>
                            </div>
                        ))}

                        {/* Categories */}

                        {[
                            ["🔒 Security", security],
                            ["⚡ Performance", performance],
                            ["🐞 Bug", bug],
                            ["🎨 Style", style]
                        ].map(([label, count]) => (
                            <div key={label} className="col-6 col-md-3">
                                <div
                                    className="border border-secondary p-4 d-flex justify-content-between align-items-center"
                                    style={{ minHeight: "70px" }}
                                >
                                    <span>{label}</span>

                                    <span
                                        className="fw-bold"
                                        style={{ fontSize: "1.5rem" }}
                                    >
                                        {count}
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReviewSummary;