function CategoryFilter({ selected, onChange }) {

    const categories = [
        { key: "ALL", label: "ALL" },
        { key: "SECURITY", label: "🔒 SECURITY" },
        { key: "PERFORMANCE", label: "⚡ PERFORMANCE" },
        { key: "BUG", label: "🐞 BUG" },
        { key: "STYLE", label: "🎨 STYLE" }
    ];

    return (
        <div className="container-fluid mt-3">

            <div className="btn-group d-flex flex-wrap w-100">

                {categories.map(category => (
                    <button
                        key={category.key}
                        className={`btn rounded-0 p-3 ${
                            selected === category.key
                                ? "btn-light"
                                : "btn-outline-light"
                        }`}
                        onClick={() => onChange(category.key)}
                    >
                        {category.label}
                    </button>
                ))}

            </div>

        </div>
    );
}

export default CategoryFilter;