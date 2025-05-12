import React, { useState } from 'react';
import { Search, Menu, User, Settings, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onMenuToggle}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 mr-2">
              <path className="fill-current text-blue-500" d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
            </svg>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">NewsAggregator</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
          <SearchBar className="w-full" />
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? 
              <Sun size={20} className="text-gray-700 dark:text-gray-300" /> :
              <Moon size={20} className="text-gray-700 dark:text-gray-300" />
            }
          </button>
          
          <Link 
            to="/settings"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-700 dark:text-gray-300" />
          </Link>
          
          <Link 
            to="/profile"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Profile"
          >
            <User size={20} className="text-gray-700 dark:text-gray-300" />
          </Link>
        </div>
      </div>
      
      {showSearch && (
        <div className="px-4 pb-3 md:hidden">
          <SearchBar onSearch={() => setShowSearch(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;