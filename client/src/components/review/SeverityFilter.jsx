function SeverityFilter({ selected, onChange }) {

    const filters = [
        "ALL",
        "CRITICAL",
        "HIGH",
        "MEDIUM",
        "LOW"
    ];

    return (
        <div className="container-fluid mt-4">

            <div className="btn-group d-flex flex-wrap w-100">

                {filters.map(filter => (
                    <button
                        key={filter}
                        className={`btn rounded-0  p-3 ${
                            selected === filter
                                ? "btn-light"
                                : "btn-outline-light"
                        }`}
                        onClick={() => onChange(filter)}
                    >
                        {filter}
                    </button>
                ))}

            </div>

        </div>
    );
}

export default SeverityFilter;