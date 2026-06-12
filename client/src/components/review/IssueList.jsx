import { useState } from "react";
import IssueCard from "./IssueCard";


function IssueList({ comments }) {

    return (
        <>
            {
                comments.map(issue => {
                    return <IssueCard issue={issue} />
                })
            }

            {comments.length === 0 && (
                <p className="text-muted text-center py-4">
                    No issues found for this filter.
                </p>
            )}
        </>
    );
}

export default IssueList;