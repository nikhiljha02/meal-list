import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import Details from "./components/Details";

function Home() {
  const [MealData, setMealData] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let response = await fetch(
          `https://api.freeapi.app/api/v1/public/meals?page=${count}&limit=12`,
        );
        let data = await response.json();
        if (data) {
          setMealData((prev) => [...prev, ...data.data.data]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [count]);

  // Scroll handler
  useEffect(() => {
    function handleScroll() {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300;

      if (bottom && !loading && count < 30) {
        setCount((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <h3>Mess Meal List</h3>

      {MealData.length === 0 ? (
        <h3>Loading......</h3>
      ) : (
        <Card data={MealData} state={setCount} />
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
