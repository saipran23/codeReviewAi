import { useState } from "react";

function IssueCard({ issue }) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border border-secondary p-4 mb-3">

            <div className="d-flex justify-content-between">

                <div>

                    <div
                        className="text-uppercase mb-3"
                        style={{
                            letterSpacing: "4px",
                            color: "#9ca3af"
                        }}
                    >
                        🔒 {issue.category}
                    </div>

                    <div className="mb-3">

                        <strong>
                            {issue.file_name}
                        </strong>

                        {" : "}

                        {issue.line_number}

                    </div>

                    <p>{issue.message}</p>

                    <button
                        className="btn btn-outline-light rounded-0"
                        onClick={() =>
                            setShowDetails(!showDetails)
                        }
                    >
                        {showDetails
                            ? "HIDE DETAILS"
                            : "VIEW DETAILS"}
                    </button>

                </div>

                <span
                    className="badge bg-light text-dark align-self-start"
                >
                    {issue.severity.toUpperCase()}
                </span>

            </div>

            {showDetails && (
                <>
                    <hr />

                    <div className="mb-4">

                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                color: "#9ca3af"
                            }}
                        >
                            Why It Matters
                        </div>

                        <p>{issue.why_it_matters}</p>

                    </div>

                    <div className="mb-4">

                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                color: "#9ca3af"
                            }}
                        >
                            Offending Code
                        </div>

                        <pre className="border border-secondary p-3 bg-black text-light">
                            {issue.offending_code}
                        </pre>

                    </div>

                    <div>

                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                color: "#9ca3af"
                            }}
                        >
                            Suggested Fix
                        </div>

                        <pre className="border border-secondary p-3 bg-black text-light">
                            {issue.suggested_fix}
                        </pre>

                    </div>
                </>
            )}

        </div>
    );
}

export default IssueCard;