import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryOption } from '../../types';

interface CategoryNavProps {
  categories: CategoryOption[];
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Extract the current category from the path
  const getCurrentCategory = () => {
    const path = currentPath.split('/')[1] || 'general';
    return path === '' ? 'general' : path;
  };

  const currentCategory = getCurrentCategory();

  const handleCategoryClick = (category: string) => {
    navigate(`/${category === 'general' ? '' : category}`);
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex whitespace-nowrap px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`py-3 px-4 text-sm font-medium transition-colors relative
                ${currentCategory === category.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              aria-current={currentCategory === category.id ? 'page' : undefined}
            >
              {category.label}
              {currentCategory === category.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;