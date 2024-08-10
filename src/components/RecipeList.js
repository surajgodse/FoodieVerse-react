import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const API_KEY = '****';
const APP_ID = '***';
const BASE_URL = 'https://api.edamam.com/search';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: 'veg',
            app_id: APP_ID,
            app_key: API_KEY,
          },
        });
        setRecipes(response.data.hits || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        toast.error('Error fetching recipes');
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          app_id: APP_ID,
          app_key: API_KEY,
        },
      });
      if (response.data.hits && response.data.hits.length > 0) {
        setRecipes(response.data.hits);
      } else {
        toast.error('No recipes found');
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Error fetching recipes');
    }
  };

  const addToFavorites = (recipe) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!existingFavorites.find((fav) => fav.uri === recipe.recipe.uri)) {
      localStorage.setItem('favorites', JSON.stringify([...existingFavorites, recipe.recipe]));
      toast.success('Recipe added to favorites!');
    } else {
      toast.info('Recipe already in favorites');
    }
  };

  return (
    <div className="content">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="recipe-list">
        {recipes.map((item) => (
          <div key={item.recipe.uri} className="recipe">
            <img src={item.recipe.image} alt={item.recipe.label} />
            <div className="recipe-info">
  <h3>{item.recipe.label}</h3>
  <ul>
    {item.recipe.ingredientLines.slice(0, 3).map((ingredient, index) => (
      <li key={index}>{ingredient}</li>
    ))}
  </ul>
  <Link to={`/recipe/${encodeURIComponent(item.recipe.uri)}`}>
    <button>View Details</button>
  </Link>
  <button onClick={() => addToFavorites(item)}>Add to Favorites</button>
</div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default RecipeList;
