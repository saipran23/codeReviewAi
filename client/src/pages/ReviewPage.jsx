import ReviewHeader from "../components/review/ReviewHeader";
import ReviewOverview from "../components/review/ReviewOverview";
import ReviewMeta from "../components/review/ReviewMeta";
import SeverityFilter from "../components/review/SeverityFilter";
import CategoryFilter from "../components/review/CategoryFilter";
import FileList from "../components/review/FileList";
import IssueList from "../components/review/IssueList";
import DiffViewer from "../components/DiffViewer";

import { useParams } from "react-router";
import api from "../services/api";
import { useState, useEffect } from "react";

function ReviewPage() {

    const { id } = useParams();

    // console.log(id);
    const [review, setReview] = useState(null);
    const [comments, setComments] = useState([]);



    const [severity, setSeverity] = useState("ALL");
    const [category, setCategory] = useState("ALL");
    const [selectedFile, setSelectedFile] = useState("ALL");



    useEffect(() => {

        const fetchData = async () => {
            try {

                const [reviewResponse, commentsResponse] =
                    await Promise.all([
                        api.get(`/api/reviews/${id}`),
                        api.get(`/api/reviews/${id}/comments`)
                    ]);

                setReview(reviewResponse.data);
                setComments(commentsResponse.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [id]);






    const filterComments = comments.filter(comment => {

        const severityMatch = severity === "ALL" || comment.severity === severity.toLowerCase();

        const categoryMatch = category === "ALL" || comment.category === category.toLowerCase();

        return severityMatch && categoryMatch;
    });

    // console.log(filterComments);

    if (!review || !comments) {
        return (
            <div className="text-white p-5">
                Loading review...
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-vh-100 p-5">
            <ReviewHeader review={review} />

            <ReviewMeta review={review} />

            <ReviewOverview
                comments={comments}
                qualityScore={review.code_quality_score}
                riskLevel={review.risk_level}
            />

            <SeverityFilter
                selected={severity}
                onChange={setSeverity}
            />

            <CategoryFilter
                selected={category}
                onChange={setCategory}
            />

            <div className="row mt-4 align-items-start">

                <div className="col-md-3">

                    <div className="border rounded p-2 overflow-auto"
                        style={{
                            position: "sticky",
                            top: "20px",
                            maxHeight: "500px"
                        }}
                    >
                        <FileList
                            comments={comments}
                            selectedFile={selectedFile}
                            onSelectFile={setSelectedFile}
                        />
                    </div>

                </div>

                <div className="col-md-9">

                    <div
                        className="border rounded p-2 overflow-auto"
                        style={{ maxHeight: "700px" }}
                    >
                        <IssueList comments={filterComments} />
                    </div>

                </div>

            </div>

            <div>

                <div
                    className="border rounded p-2 overflow-auto"
                    style={{ maxHeight: "700px", marginTop: '25px' }}
                >
                    <DiffViewer diffText={review.diff_text} comments={comments} />
                </div>


            </div>

        </div>
    )

}

export default ReviewPage;