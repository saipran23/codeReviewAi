
import "bootstrap/dist/css/bootstrap.min.css";
function ReviewHeader({ review }) {

    return (
        <div className=" container-fluid bg-black text-white p-4">
            <p
                className="text-uppercase mb-4"
                style={{
                    letterSpacing: "4px",
                    fontSize: "12px",
                    color: "#9ca3af"
                }}
            >
                AI CODE REVIEW · REV_{review.id}
            </p>

            <div className="d-flex align-items-center align-self-center border border-white p-4 mb-4" style={{ minHeight: "100px" }}>
                <div className="me-4"
                    style={{
                        fontSize: "40px",
                        color: "#fbbf24"
                    }}>⚠️</div>
                <div>
                    <p className="mb-1 text-uppercase"
                        style={{
                            letterSpacing: "3px",
                            fontSize: "15px",
                            color: "#9ca3af"
                        }}>AI Recommendation</p>
                    <p className="fw-bold mb-0">{review.recommendation}</p>

                </div>
            </div>

            <hr className="border border-secondary opacity-100 mb-4"></hr>

            <div className="d-flex justify-content-between flex-row align-items-start align-items-md-center justify-content-sm-start justify-content-md-between flex-column flex-sm-row
  gap-3 ">
                <h1 className="fw-bold m-0"
                    style={{
                        fontSize: "2.5rem",
                        letterSpacing: "-2px"
                    }}>{review.repo_name}</h1>
                <span
                    className="bg-light text-dark px-3 py-3 fw-bold text-uppercase"
                    style={{
                        letterSpacing: "2px",
                        fontSize: "14px"
                    }}
                >
                    {review.status}
                </span>
            </div>

        </div>

    );

}

export default ReviewHeader;