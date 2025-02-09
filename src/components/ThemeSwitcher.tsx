import React from 'react';
import './ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <button 
      className="theme-switcher" 
      onClick={toggleTheme}
      aria-label="Theme Switcher"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}; 