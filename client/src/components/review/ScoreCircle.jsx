function ScoreCircle({ score }) {
    return (
        <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
                width: "140px",
                height: "140px",
                background: `conic-gradient(
                    #f8f9fa ${score * 3.6}deg,
                    #444 ${score * 3.6}deg
                )`,
                transform: "rotate(-135deg)"
            }}
        >
            <div
                className="rounded-circle bg-black d-flex align-items-center justify-content-center"
                style={{
                    width: "120px",
                    height: "120px",
                    transform: "rotate(135deg)"
                }}
            >
                <h2 className="fw-bold text-white m-0">{score}</h2>
            </div>
        </div>
    );
}

export default ScoreCircle;