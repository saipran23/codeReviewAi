import ReviewForm from "../components/ReviewForm";

function Home() {
    return (
        <div >
            <h1>Welcome to PRReview.ai</h1>
            <p>AI-powered GitHub Pull Request Reviews.</p>

            <div>
                <ReviewForm />
            </div>
        </div>
    );
}

export default Home;