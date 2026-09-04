import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

interface Ingredient {
    name: string;
    quantity: string;
}

interface Instruction {
    step: number;
    description: string;
}

interface Recipe {
    _id: string;
    title: string;
    image?: string;
    description?: string;
    tags: string[];
    ingredients: Ingredient[];
    instructions: Instruction[];
}

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!recipe) return null;

  return (
    <div>
      <Link to="/recipes">&larr; Back to Recipes</Link>
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "300px" }} />
      )}
      {recipe.description && <p>{recipe.description}</p>}

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing.name}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions[0]?.description}</p>

      {recipe.tags.length > 0 && (
        <p>
          <strong>Tags:</strong> {recipe.tags.join(", ")}
        </p>
      )}
    </div>
  );
}

export default RecipeDetail;
