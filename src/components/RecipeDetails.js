import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = 'a67ecc892281158e914070577cc39d73';
const APP_ID = '65ef7904';
const BASE_URL = 'https://api.edamam.com/search';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const decodedId = decodeURIComponent(id);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            r: decodedId,
            app_id: APP_ID,
            app_key: API_KEY,
          },
        });
        setRecipe(response.data[0]);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        toast.error('Error fetching recipe details');
      }
    };
  
    fetchRecipeDetails();
  }, [decodedId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.label}</h1>
      <img src={recipe.image} alt={recipe.label} className="recipe-poster" />
      <div className="details">
        <div className="details-container">
          <div className="details-row">
            <p><strong>Source:</strong> {recipe.source}</p>
          </div>
          <div className="details-row">
            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="details-row">
            <p><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
          </div>
          <div className="details-row">
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              <button className="source-button">View Full Recipe</button>
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RecipeDetails;