import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

interface Recipe {
    _id: string;
    title: string;
    image?: string;
    description?: string;
    tags: string[];
}

function Recipe(){
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        fetchRecipes();
    }, []);

    async function fetchRecipes(query = "") {
        setLoading(true);
        try{
            const res = await api.get("/recipes", {
                params: query ? { title: query } : {},
            });
            setRecipes(res.data);
            setError("");
        } catch (err) {
            setError("Error loading the recipes...");
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(e: React.FormEvent){
        e.preventDefault();
        fetchRecipes(search);
    }

    return (
        <div>
            <h1> Recipe List</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search recipes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && recipes.length === 0 && <p>We couldn't find any recipes.</p>}

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recipe;