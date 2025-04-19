import React from 'react';
import { useApp } from '../context/AppContext';
import { Code, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage } = useApp();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header 
      className={`px-4 py-3 flex items-center justify-between border-b ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <Code className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-blue-500">Code</span>
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
              Sonnet
            </span>
            <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
              AI
            </span>
          </h1>
        </div>
        <div className="ml-6 hidden md:flex items-center space-x-1">
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            v4.0
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className={`flex rounded-lg overflow-hidden border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <button
            onClick={() => setLanguage('java')}
            className={`px-3 py-1 text-sm transition-colors ${
              language === 'java'
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-800'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-400 hover:text-white'
                : 'bg-white text-gray-600 hover:text-gray-800'
            }`}
          >
            Java
          </button>
          <button
            onClick={() => setLanguage('kotlin')}
            className={`px-3 py-1 text-sm transition-colors ${
              language === 'kotlin'
                ? theme === 'dark'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-800'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-400 hover:text-white'
                : 'bg-white text-gray-600 hover:text-gray-800'
            }`}
          >
            Kotlin
          </button>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;