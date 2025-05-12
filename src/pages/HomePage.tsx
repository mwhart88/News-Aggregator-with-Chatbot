import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryOption } from '../types';
import Header from '../components/Navigation/Header';
import CategoryNav from '../components/Navigation/CategoryNav';
import ArticleGrid from '../components/Articles/ArticleGrid';
import ChatOverlay from '../components/ChatOverlay';
import { useArticles } from '../hooks/useArticles';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import { MessageCircle } from 'lucide-react';

const CATEGORIES: CategoryOption[] = [
  { id: 'general', label: 'All News' },
  { id: 'sports', label: 'Sports' },
  { id: 'finance', label: 'Finance' },
  { id: 'politics', label: 'Politics' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'music', label: 'Music' }
];

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { category = 'general' } = useParams<{ category?: string }>();
  
  // Use custom hook to fetch articles
  const { 
    articles, 
    isLoading, 
    error, 
    hasMore, 
    loadMore,
    updateParams
  } = useArticles({ category: category as any });
  
  // Update articles when category changes
  React.useEffect(() => {
    updateParams({ category: category as any });
  }, [category, updateParams]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onMenuToggle={toggleSidebar} />
      <CategoryNav categories={CATEGORIES} />
      
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-4">
        <ErrorBoundary>
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300">
              <h3 className="text-lg font-semibold mb-1">Failed to load articles</h3>
              <p>{error}</p>
              <button
                onClick={() => updateParams({})} // Refresh
                className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 rounded hover:bg-red-200 dark:hover:bg-red-700"
              >
                Try again
              </button>
            </div>
          ) : (
            <ArticleGrid
              articles={articles}
              isLoading={isLoading}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          )}
        </ErrorBoundary>
      </main>
      
      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
        aria-label="Open news chat"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat Overlay */}
      {chatOpen && <ChatOverlay onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default HomePage;