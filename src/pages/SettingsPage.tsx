import React, { useState, useEffect } from 'react';
import { ChevronLeft, Moon, Sun, Bell, EyeOff, Save, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Category, CategoryOption, UserPreferences } from '../types';

const CATEGORIES: CategoryOption[] = [
  { id: 'general', label: 'Top stories' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' }
];

const SOURCES = [
  { id: 'tech-daily', name: 'Tech Daily' },
  { id: 'business-insights', name: 'Business Insights' },
  { id: 'science-today', name: 'Science Today' },
  { id: 'sports-chronicle', name: 'Sports Chronicle' },
  { id: 'health-digest', name: 'Health Digest' },
  { id: 'entertainment-weekly', name: 'Entertainment Weekly' }
];

const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  
  // Initialize preferences from localStorage if available
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : {
      preferredCategories: ['general', 'technology', 'business'] as Category[],
      excludedSources: [] as string[],
      darkMode: false,
      fontSize: 'medium',
      enableNotifications: true,
      autoRefresh: false,
      refreshInterval: 30
    };
  });
  
  // Toggle category preference
  const toggleCategory = (category: Category) => {
    setPreferences(prev => {
      if (prev.preferredCategories.includes(category)) {
        // Prevent removing last category
        if (prev.preferredCategories.length === 1) {
          return prev;
        }
        return {
          ...prev,
          preferredCategories: prev.preferredCategories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          preferredCategories: [...prev.preferredCategories, category]
        };
      }
    });
  };
  
  // Toggle source exclusion
  const toggleSource = (sourceId: string) => {
    setPreferences(prev => {
      if (prev.excludedSources.includes(sourceId)) {
        return {
          ...prev,
          excludedSources: prev.excludedSources.filter(s => s !== sourceId)
        };
      } else {
        return {
          ...prev,
          excludedSources: [...prev.excludedSources, sourceId]
        };
      }
    });
  };
  
  // Toggle notifications
  const toggleNotifications = () => {
    setPreferences(prev => ({
      ...prev,
      enableNotifications: !prev.enableNotifications
    }));
  };
  
  // Toggle auto refresh
  const toggleAutoRefresh = () => {
    setPreferences(prev => ({
      ...prev,
      autoRefresh: !prev.autoRefresh
    }));
  };
  
  // Handle refresh interval change
  const handleRefreshIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences(prev => ({
      ...prev,
      refreshInterval: parseInt(e.target.value, 10)
    }));
  };
  
  // Handle font size change
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences(prev => ({
      ...prev,
      fontSize: e.target.value
    }));
  };
  
  // Save preferences
  const saveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      setIsSaving(false);
      setShowSaveMessage(true);
      
      // Hide message after 3 seconds
      setTimeout(() => {
        setShowSaveMessage(false);
      }, 3000);
    }, 800);
  };
  
  // Update darkMode in preferences when it changes in context
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      darkMode
    }));
  }, [darkMode]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link 
            to="/"
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Save notification */}
        {showSaveMessage && (
          <div className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-4 py-2 rounded-lg shadow-md animate-fadeIn">
            Settings saved successfully!
          </div>
        )}
        
        <div className="space-y-6">
          {/* Appearance section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Appearance
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customize your reading experience
                  </p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? 
                    <Sun size={20} className="text-yellow-500" /> :
                    <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                  }
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Font size
              </label>
              <select
                value={preferences.fontSize}
                onChange={handleFontSizeChange}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select font size"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </section>
          
          {/* Notifications section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Notifications
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure how you receive updates
                  </p>
                </div>
                <button
                  onClick={toggleNotifications}
                  className={`p-2 rounded-full transition-colors ${
                    preferences.enableNotifications 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                  aria-label={preferences.enableNotifications ? 'Disable notifications' : 'Enable notifications'}
                  aria-pressed={preferences.enableNotifications}
                >
                  <Bell size={20} />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto refresh content
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={preferences.autoRefresh}
                    onChange={toggleAutoRefresh}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {preferences.autoRefresh && (
                <div className="pl-0 mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Refresh interval
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={preferences.refreshInterval}
                      onChange={handleRefreshIntervalChange}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Select refresh interval"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                    <RefreshCw size={18} className="text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {/* Content preferences section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Content Preferences
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose what content to see in your feed
              </p>
            </div>
            
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      preferences.preferredCategories.includes(category.id)
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    aria-pressed={preferences.preferredCategories.includes(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Select categories you're interested in seeing in your feed
              </p>
            </div>
            
            <div className="px-6 py-4">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
                News Sources
              </h3>
              <div className="space-y-2">
                {SOURCES.map((source) => (
                  <div key={source.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {source.name}
                    </span>
                    <button
                      onClick={() => toggleSource(source.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        preferences.excludedSources.includes(source.id)
                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                      aria-label={preferences.excludedSources.includes(source.id) ? `Show ${source.name}` : `Hide ${source.name}`}
                      aria-pressed={preferences.excludedSources.includes(source.id)}
                    >
                      <EyeOff size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Click the eye icon to hide sources you don't want to see
              </p>
            </div>
          </section>
          
          {/* Save button */}
          <div className="sticky bottom-4 flex justify-center">
            <button
              onClick={saveSettings}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;