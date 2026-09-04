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
    <div className="page-container">
        <h1>Recipe List</h1>
        <form onSubmit={handleSearch} className="form-group" style={{ maxWidth: "400px" }}>
        <input
            type="text"
            placeholder="Search recipes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && recipes.length === 0 && <p>We couldn't find any recipes.</p>}

        <div className="card-grid">
        {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
            <div className="recipe-card-body">
                <h3>{recipe.title}</h3>
                {recipe.tags.length > 0 && (
                <div className="tag-list">
                    {recipe.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                    ))}
                </div>
                )}
                <Link to={`/recipes/${recipe._id}`}>View Recipe</Link>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}

export default Recipe;