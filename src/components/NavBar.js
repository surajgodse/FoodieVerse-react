import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ toggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
}

export default NavBar;
