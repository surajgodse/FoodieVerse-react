import React from 'react';

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}

export default ThemeToggle;
