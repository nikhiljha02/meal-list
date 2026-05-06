import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState([]);
  const [dark, setDark] = useState(false);

  // Apply/remove dark class on <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.freeapi.app/api/v1/public/meals/${id}`,
      );
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center transition">
      {/* Toggle Button */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-5 right-5 p-3 rounded-full bg-black text-yellow-400 
             dark:bg-white dark:text-gray-800 shadow-lg transition"
      >
        {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transition">
        {/* Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {meal.strMeal}
          </h1>

          {/* Tags */}
          <div className="flex gap-3 mt-2 text-sm">
            <span className="bg-green-100 dark:bg-green-700 dark:text-white px-3 py-1 rounded-full">
              {meal.strCategory}
            </span>
            <span className="bg-blue-100 dark:bg-blue-700 dark:text-white px-3 py-1 rounded-full">
              {meal.strArea}
            </span>
          </div>

          {/* Instructions */}
          <h2 className="text-xl font-semibold mt-6 dark:text-white">
            Instructions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            {meal.strInstructions}
          </p>

          {/* Ingredients */}
          <h2 className="text-xl font-semibold mt-6 dark:text-white">
            Ingredients
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {ingredients.map((item, index) => (
              <li
                key={index}
                className="bg-gray-100 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-lg flex justify-between"
              >
                <span>{item.ing}</span>
                <span className="text-gray-500 dark:text-gray-300">
                  {item.mea}
                </span>
              </li>
            ))}
          </ul>

          {/* Button */}
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Watch Video
          </a>
        </div>
      </div>
    </div>
  );
}

export default Details;
