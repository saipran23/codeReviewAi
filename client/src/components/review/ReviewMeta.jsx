import "bootstrap/dist/css/bootstrap.min.css";


function ReviewMeta({ review }) {

    const url = review.pr_url;

    const pullNumber = url.match(/\/pull\/(\d+)/)?.[1];

    const dateTime = review.created_at;

    const date = new Date(dateTime).toISOString().split("T")[0];

    return (
        <div className="container-fluid mt-4">


            <div className="row g-0 border border-secondary">


                <div className="col-12 col-md-6 col-lg-3 border-end border-secondary">
                    <div className="p-4">
                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "3px",
                                fontSize: "12px",
                                color: "#6b7280"
                            }}
                        >
                            Repository
                        </div>

                        <h3
                            className="fw-semibold m-0"
                            style={{ fontSize: "2rem" }}
                        >
                            {review.repo_name}
                        </h3>
                    </div>
                </div>


                <div className="col-12 col-md-6 col-lg-3 border-end border-secondary">
                    <div className="p-4">
                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                fontSize: "12px",
                                color: "#6b7280"
                            }}
                        >
                            Pull Request
                        </div>

                        <h3
                            className="fw-semibold m-0"
                            style={{ fontSize: "2rem" }}
                        >
                            #{pullNumber}
                        </h3>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 border-end border-secondary">
                    <div className="p-4">
                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                fontSize: "12px",
                                color: "#6b7280"
                            }}
                        >
                            Date
                        </div>

                        <h3
                            className="fw-semibold m-0"
                            style={{ fontSize: "2rem" }}
                        >
                            {date}
                        </h3>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="p-4">
                        <div
                            className="text-uppercase mb-3"
                            style={{
                                letterSpacing: "4px",
                                fontSize: "12px",
                                color: "#6b7280"
                            }}
                        >
                            Status
                        </div>

                        <h3
                            className={`fw-semibold m-0 ${review.status === "completed"
                                    ? "text-success"
                                    : review.status === "failed"
                                        ? "text-danger"
                                        : review.status === "processing"
                                            ? "text-warning"
                                            : ""
                                }`}
                            style={{ fontSize: "2rem" }}
                        >
                            {review.status}
                        </h3>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default ReviewMeta;
