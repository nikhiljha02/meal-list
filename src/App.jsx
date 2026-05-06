import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import Details from "./components/Details";

function Home() {
    const [MealData, setMealData] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`https://api.freeapi.app/api/v1/public/meals?page=${count}&limit=12`);
            let data = await response.json();
            if (data) {
                setMealData(data.data.data);
            }
        }
        fetchData();
    }, [count]);

    return (
        <>
            <h3>Mess Meal List</h3>

            {MealData.length === 0 ? <h3>Loading......</h3> : <Card data={MealData} state={setCount} />}
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
