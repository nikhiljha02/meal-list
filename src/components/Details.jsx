import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
    const { id } = useParams();
    const [meal, setMeal] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`https://api.freeapi.app/api/v1/public/meals/${id}`);
            let resData = await response.json();
            if (meal) {
                setMeal(resData.data);
            }
        }
        fetchData();
    }, []);
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const mea = meal[`strMeasure${i}`];
        if (ing) {
            ingredients.push({ ing, mea });
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Image */}
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-72 object-cover" />

                <div className="p-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800">{meal.strMeal}</h1>

                    {/* Tags */}
                    <div className="flex gap-3 mt-2 text-sm text-gray-600">
                        <span className="bg-green-100 px-3 py-1 rounded-full">{meal.strCategory}</span>
                        <span className="bg-blue-100 px-3 py-1 rounded-full">{meal.strArea}</span>
                    </div>

                    {/* Instructions */}
                    <h2 className="text-xl font-semibold mt-6">Instructions</h2>
                    <p className="text-gray-700 mt-2 leading-relaxed">{meal.strInstructions}</p>

                    {/* Ingredients */}
                    <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {ingredients.map((item, index) => (
                            <li key={index} className="bg-gray-100 px-3 py-2 rounded-lg flex justify-between">
                                <span>{item.ing}</span>
                                <span className="text-gray-500">{item.mea}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="inline-block mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                        Watch Video
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Details;
