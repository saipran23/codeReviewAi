import ReviewForm from "../components/ReviewForm";



function Home() {


    return (    
        <div className="container bg-black py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card bg-black text-light shadow-lg">
                        <div className="card-body p-5 text-center">

                            <p className="text-uppercase text-secondary mb-2 fs-4">
                                PRReview.ai
                            </p>

                            <h1 className="fw-bold mb-3">
                                Review a pull request
                            </h1>

                            <p className="text-secondary mb-5">
                                Paste a GitHub PR URL below. We'll fetch the diff
                                and run a full AI code review.
                            </p>

                            <ReviewForm />

                        </div>
                    </div>

                    <div className="row mt-4 g-3">

                        <div className="col-md-4">
                            <div className="card bg-black text-light border-secondary h-100">
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle bg-success text-dark fw-bold mx-auto mb-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            lineHeight: "40px"
                                        }}
                                    >
                                        1
                                    </div>

                                    <h5>Submit</h5>

                                    <p className="text-secondary mb-0">
                                        Paste the PR link and click Review code.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card bg-black
                             text-light border-secondary h-100">
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle bg-success text-dark fw-bold mx-auto mb-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            lineHeight: "40px"
                                        }}
                                    >
                                        2
                                    </div>

                                    <h5>Wait ~45s</h5>

                                    <p className="text-secondary mb-0">
                                        We fetch the diff and run AI analysis in
                                        the background.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card bg-black text-light border-secondary h-100">
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle bg-success text-dark fw-bold mx-auto mb-3"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            lineHeight: "40px"
                                        }}
                                    >
                                        3
                                    </div>

                                    <h5>Read results</h5>

                                    <p className="text-secondary mb-0">
                                        View the diff, comments, score and risk
                                        level.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;