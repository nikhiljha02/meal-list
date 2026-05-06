import { useNavigate } from "react-router-dom";

function Card({ data, state }) {
    const navigate = useNavigate();
    const goToPage = (id) => {
        navigate(`/details/${id}`);
    };
    function prevClick() {
        state((prev) => (prev <= 1 ? prev : prev - 1));
    }

    function nextClick() {
        state((prev) => (prev >= 31 ? 1 : prev + 1));
    }
    return (
        <>
            <div className="flex gap-5 justify-center">
                <button onClick={nextClick}>Next</button>
                <button onClick={prevClick}>prev</button>
            </div>
            <div className="mainContainer grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 py-8 ">
                {data.map((ele, i) => (
                    <div key={i} className="group bg-gray-300  rounded-2xl shadow-sm h-80 hover:shadow-lg transition-all duration-300 overflow-hidden">
                        {/* Image (smaller height) */}
                        <div
                            className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{
                                backgroundImage: `url(${ele.strMealThumb})`,
                            }}
                        />

                        {/* Content */}
                        <div className="p-4">
                            {/* Title */}
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-500 transition truncate">{ele.strMeal}</h2>

                            {/* Category + Origin in flex row */}
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">🍽 {ele.strCategory}</span>

                                <span className="flex items-center gap-1">🌍 {ele.strArea}</span>
                            </div>

                            {/* Button */}
                            <button rel="noopener noreferrer" className="block mt-4 text-center text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg transition w-full cursor-pointer" data-id={ele.id} onClick={() => goToPage(ele.id)}>
                                View Dish
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Card;
