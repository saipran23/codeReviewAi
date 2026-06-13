import api from '../services/api';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewForm() {

    const [loading, setLoading] = useState(false);
    const [PrUrl, setPrUrl] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");





    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();
        setStatus("loading");


        try {

            setLoading(true);

            const response = await api.post("/api/reviews", {
                pr_url: PrUrl,
            });
            setStatus("polling");
            setMessage("AI is reviewing the code..");


            const reviewId = response.data.review_id;

            const interval = setInterval(async () => {
                try {
                    const statusRes = await api.get(
                        '/api/reviews/' + reviewId
                    );

                    // console.log(statusRes.data);

                    if (statusRes.data.status === 'completed') {
                        clearInterval(interval);
                        navigate('/review/' + reviewId);
                    }
                } catch (err) {
                    console.log("Polling Error:", err);

                    clearInterval(interval);

                    setStatus("error");
                    setMessage(
                        err.response?.data?.error ||
                        err.message
                    );
                }
            }, 3000);
        } catch (error) {

            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);

            setStatus("error");

            setMessage(
                error.response?.data?.error ||
                error.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card bg-black border-secondary">
                <div className="card-body">

                    <label className="form-label text-secondary">
                        GitHub pull request URL
                    </label>

                    <input
                        type="text"
                        className="form-control form-control-lg bg-dark text-light border-secondary"
                        placeholder="https://github.com/owner/repo/pull/42"
                        value={PrUrl}
                        onChange={(e) => setPrUrl(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading || PrUrl.length === 0}
                        className="btn btn-outline-light w-100 mt-3"
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>
                                Reviewing...
                            </>
                        ) : (
                            "Review code"
                        )}
                    </button>

                    {/* <p className="text-center text-secondary mt-3 mb-0">
                        3 of 5 free reviews used this month
                    </p> */}

                    {message && (
                        <div className="alert alert-info mt-3">
                            {message}
                        </div>
                    )}

                </div>
            </div>
        </form>

    );

}

export default ReviewForm;