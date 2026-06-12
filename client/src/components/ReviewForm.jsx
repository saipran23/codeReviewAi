import api from '../services/api';

import { useState } from 'react';
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

            setStatus('error');

            setMessage(
                error.response?.data?.error || 'Something went wrong'
            );

        }


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Paste GitHub PR URL"
                    value={PrUrl}
                    onChange={(e) => setPrUrl(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Review PR"}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>

    );

}

export default ReviewForm;