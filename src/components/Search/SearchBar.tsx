import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  className?: string;
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Use debounce to prevent excessive search requests
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Listen for changes in debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      // In a real app, this would trigger a search API call
      console.log(`Searching for: ${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (onSearch) onSearch();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };
  
  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <div className={`flex items-center overflow-hidden rounded-full border ${
        isFocused 
          ? 'border-blue-500 bg-white shadow-sm dark:bg-gray-800' 
          : 'border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
      }`}>
        <div className="flex items-center justify-center pl-3">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for news..."
          className="w-full py-2 px-3 text-gray-800 dark:text-gray-200 bg-transparent outline-none"
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center pr-3"
            aria-label="Clear search"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;