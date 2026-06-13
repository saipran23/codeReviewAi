import { Link } from "react-router-dom";
import api from "../services/api";

import { useState, useEffect, use } from "react";

import { useAuth } from "../services/AuthContext";

export default function MyReview() {

    const [review, setReview] = useState([]);

    useEffect(() => {
        async function fetchReview() {

            const response = await api.get(`/api/reviews/`);
            setReview(response.data);
        }
        fetchReview();
    }, [])

    async function deleteReview(id) {

        const response = await api.delete(`/api/reviews/${id}`);

        const updatedReviews = review.filter(r => r.id !== id);
        setReview(updatedReviews);

    }

    const { isLogin } = useAuth();

    if (!isLogin) {
        return (
            <div className="container-fluid mt-4 text-white bg-black min-vh-100 p-5">
                <div className="border border-secondary text-center py-5 ">
                    <p>Please login to view your reviews.</p>

                    <Link
                        to="/login"
                        className="btn btn-light"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-4 text-white bg-black min-vh-100 p-5">

            <h3
                className="mb-4 text-uppercase"
                style={{
                    letterSpacing: "3px"
                }}
            >
                My Reviews
            </h3>
            {

                review.length === 0 ? (

                    <div
                        className="border border-secondary text-center py-5"
                    >
                        <p className="text-secondary mb-3">
                            No reviews yet.
                        </p>

                        <Link
                            to="/"
                            className="btn btn-outline-light rounded-0"
                        >
                            Paste the PR URL to get started
                        </Link>
                    </div>

                ) : (

                    <div className="row g-3">

                        {review.map((r) => (

                            <div
                                key={r.id}
                                className="col-12"
                            >

                                <div
                                    className="border border-secondary p-4"
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <Link
                                                to={`/review/${r.id}`}
                                                className="text-decoration-none text-white"
                                            >
                                                <h5 className="mb-2">
                                                    {r.repo_name || "Unknown repo"}
                                                </h5>
                                            </Link>

                                            <small className="text-secondary">
                                                {new Date(
                                                    r.created_at
                                                ).toLocaleDateString()}
                                            </small>

                                        </div>

                                        <div className="d-flex align-items-center gap-3">

                                            <span
                                                className={`badge rounded-0 p-2 ${r.status === "completed"
                                                    ? "bg-success"
                                                    : r.status === "failed"
                                                        ? "bg-danger"
                                                        : "bg-warning text-dark"
                                                    }`}
                                            >
                                                {r.status.toUpperCase()}
                                            </span>

                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-0 "
                                                onClick={() => deleteReview(r.id)}
                                            >
                                                DELETE
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )
            }

        </div>
    );
}