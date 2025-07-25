import { useState, useEffect } from 'react';

const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`mr-5 min-w-10 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800  hover:bg-gray-300 dark:hover:bg-gray-700 text-2xl transition-all duration-300 border border-gray-300 dark:border-gray-600
      ${className}
      `}
      title={`Basculer vers le thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      {theme === 'dark' ? (
        '🌞'
      ) : (
        '🌜'
      )}
    </button>
  );
};

export default ThemeToggle;