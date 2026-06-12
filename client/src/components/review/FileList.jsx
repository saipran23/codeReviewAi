function FileList({ comments }) {

    const files = [
        ...new Set(comments.map(comment => comment.file_name))
    ];

    return (
        <div className="border border-secondary p-4 h-100">

            <h6
                className="text-uppercase mb-4"
                style={{
                    letterSpacing: "3px",
                    color: "#9ca3af"
                }}
            >
                Files Reviewed
            </h6>

            <ul className="list-group list-group-flush">

                <li
                    className="list-group-item bg-black text-light border-secondary d-flex justify-content-between"
                >
                    <span>All Files</span>
                    <span>{files.length}</span>
                </li>

                {files.map(file => (
                    <li
                        key={file}
                        className="list-group-item bg-black text-light border-secondary"
                    >
                        {file}
                    </li>
                ))}

            </ul>

        </div>
    );
}

export default FileList;