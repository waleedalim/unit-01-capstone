import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import api from "../api/axios";
//import { Route } from "react-router-dom";

interface Recipe {
   _id: string;
   title: string;
   ownerId: string;
   image?: string;
   tags: string[];
   ingredients: { name: string; quantity: string }[];
   instructions: { step: number; description: string }[];
}

function Dashboard(){
   const [title, setTitle] = useState("");
   const [instructionsText, setInstrcutionText] = useState("");
   const [ingredientsText, setIngredientsText] = useState("");
   const [tags, setTags] = useState("");
   const [image, setImage] = useState("");
   const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
   const [editingId, setEditingId] = useState<string | null>(null);
   const currentUser = getCurrentUser();

   useEffect(() => {
       fetchMyRecipes();
   }, []);

   async function fetchMyRecipes() {
       const res = await api.get("/recipes");
       const mine = res.data.filter(
           (r: Recipe) => r.ownerId === currentUser?._id
       );
       setMyRecipes(mine);
   }

   function resetForm() {
       setTitle("");
       setImage("");
       setTags("");
       setInstrcutionText("");
       setIngredientsText("");
       setEditingId(null);
   }

   function handleEditClick(recipe: Recipe) {
       setEditingId(recipe._id);
       setTitle(recipe.title);
       setImage(recipe.image || "");
       setTags(recipe.tags.join(", "));
       setIngredientsText(recipe.ingredients.map((i) => i.name).join(", "));
       setInstrcutionText(recipe.instructions[0]?.description || "");
       window.scrollTo({ top: 0, behavior: "smooth" });
   }

    async function handleDelete(id: string) {
        const confirmed = window.confirm("Delete this recipe? This can't be undone.");
        if (!confirmed) return;
        try {
        await api.delete(`/recipes/${id}`);
        setMyRecipes(myRecipes.filter((r) => r._id !== id));
        } catch (err: any) {
        if (err.response?.status === 404) {
            alert("This recipe no longer exists.");
        } else if (err.response?.status === 403) {
            alert("You don't have permission to delete this recipe.");
        } else {
            alert("Something went wrong deleting this recipe.");
        }
        }
    }


   async function handleSubmit(e: React.FormEvent) {
       e.preventDefault();

       const instructions = instructionsText.trim()
       ? [{ step: 1, description: instructionsText.trim() }]
       : [];

       const payload = {
           title,
           instructions,
           ingredients: ingredientsText.split(",").map((item) => item.trim()).filter(Boolean).map((name) => ({ name, quantity: "-"})),
           tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
           image,
       };

       if (editingId) {
           await api.put(`/recipes/${editingId}`, payload);
       } else {
           await api.post("/recipes", payload);
       }

       resetForm();
       fetchMyRecipes();
   }

   return(
       <div>
           <h1>{editingId ? "Edit Recipe" : "Create a Recipe"}</h1>
           <form onSubmit={handleSubmit}>
               <h3>Title</h3>
               <input
                   placeholder="Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   required
               />
               <br />
               <h3>Ingredients</h3>
               <input
                   placeholder="Ingredients"
                   value={ingredientsText}
                   onChange={(e) => setIngredientsText(e.target.value)}
                   required />
               <br />
               <h3>Instructions</h3>
               <input
                   placeholder="Instrcutions"
                   value={instructionsText}
                   onChange={(e) => setInstrcutionText(e.target.value)}
                   required />

               <br />
               <h3>Tags</h3>
               <input
                   placeholder="Tags"
                   value={tags}
                   onChange={(e) => setTags(e.target.value)}
                   required />

               <br />
               <h3>Image</h3>
               <input
                   placeholder="Image Url"
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   required />

                   <br />
                   <button type="submit">{editingId ? "Update" : "Save"}</button>
                   {editingId && (
                       <button type="button" onClick={resetForm}>Cancel</button>
                   )}
           </form>

           <h2>Your Recipes</h2>
           {myRecipes.length === 0 && <p>You haven't created any recipes yet.</p>}
           <ul>
               {myRecipes.map((r) => (
                   <li key={r._id}>
                       {r.title}{" "}
                       <button onClick={() => handleEditClick(r)}>Edit</button>
                       <button onClick={() => handleDelete(r._id)}>Delete</button>
                   </li>
               ))}
           </ul>
       </div>
   );
}

export default Dashboard;


