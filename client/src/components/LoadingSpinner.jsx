function LoadingSpinner() {
  return (
    <div className="text-center mt-4">
      <div
        className="spinner-border"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <p className="mt-2">
        AI is reviewing your PR...
      </p>
    </div>
  );
}

export default LoadingSpinner;