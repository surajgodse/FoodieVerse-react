import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <header>
          <h1>FoodieVerse</h1>
          <nav>
            <Link to="/">Recipes</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌞' : '🌜'}
        </div>
      </div>
    </Router>
  );
}

export default App;
