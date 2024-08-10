import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Favorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const navigate = useNavigate();

  const removeFromFavorites = (uri) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.uri !== uri);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.success('Recipe removed from favorites');
    window.location.reload();
  };

  const viewRecipeDetails = (uri) => {
    navigate(`/recipe/${encodeURIComponent(uri)}`);
  };

  if (favorites.length === 0) {
    return <div>No favorite recipes yet.</div>;
  }

  return (
    <div className="favorites">
      <h1>Favorite Recipes</h1>
      <div className="recipe-list">
        {favorites.map((recipe) => (
          <div key={recipe.uri} className="recipe">
            <img src={recipe.image} alt={recipe.label} />
            <div className="recipe-info">
              <h3>{recipe.label}</h3>
              <p>{recipe.source}</p>
              <button onClick={() => viewRecipeDetails(recipe.uri)}>View Details</button>
              <button onClick={() => removeFromFavorites(recipe.uri)}>Remove from Favorites</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Favorites;