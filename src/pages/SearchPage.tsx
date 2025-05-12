import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import ArticleGrid from '../components/Articles/ArticleGrid';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../types';
import LoadingSkeleton from '../components/UI/LoadingSkeleton';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const { 
    articles, 
    isLoading, 
    error, 
    hasMore, 
    loadMore 
  } = useArticles({ q: query });
  
  // Count articles by source for the sidebar
  const sourceStats = React.useMemo(() => {
    const stats: Record<string, number> = {};
    
    articles.forEach((article: Article) => {
      const sourceName = article.source.name;
      stats[sourceName] = (stats[sourceName] || 0) + 1;
    });
    
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [articles]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onMenuToggle={() => {}} />
      
      <div className="border-b border-gray-200 dark:border-gray-700 py-3 px-4 bg-white dark:bg-gray-800">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Search results for: <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
        </h1>
      </div>
      
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="hidden md:block">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Sources</h2>
            
            {isLoading && !articles.length ? (
              <div className="space-y-2">
                <LoadingSkeleton type="text" lines={6} height="h-3" />
              </div>
            ) : (
              <ul className="space-y-2">
                {sourceStats.map(([source, count]) => (
                  <li key={source} className="text-sm flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{source}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-6">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Date</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="radio" name="date" className="text-blue-600" defaultChecked />
                  <span>Any time</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="radio" name="date" className="text-blue-600" />
                  <span>Past 24 hours</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="radio" name="date" className="text-blue-600" />
                  <span>Past week</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="radio" name="date" className="text-blue-600" />
                  <span>Past month</span>
                </label>
              </div>
            </div>
          </div>
        </aside>
        
        <div className="md:col-span-3">
          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300">
              <h3 className="text-lg font-semibold mb-1">Error</h3>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {isLoading && !articles.length 
                  ? 'Searching...' 
                  : `About ${articles.length} results`}
              </p>
              
              <ArticleGrid
                articles={articles}
                isLoading={isLoading}
                hasMore={hasMore}
                loadMore={loadMore}
              />
              
              {!isLoading && articles.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No results found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    We couldn't find any articles matching your search. Try different keywords or browse categories instead.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;