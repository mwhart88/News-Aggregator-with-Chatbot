import { useEffect, useState, useCallback } from 'react';
import { Article, SearchParams } from '../types';
import { getArticles } from '../services/backendApi';

/**
 * Custom hook for fetching and managing articles
 * @param initialParams - Initial search parameters
 * @returns Article data and loading states
 */
export const useArticles = (initialParams: SearchParams) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [params, setParams] = useState<SearchParams>(initialParams);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch articles based on current parameters
  const fetchArticles = useCallback(async (page: number, refresh = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching articles with params:`, params, `page:`, page);
      const response = await getArticles({
        ...params,
        page,
        pageSize: 10
      });
      
      console.log(`Received articles response:`, response);
      
      // If refreshing, replace articles. Otherwise, append.
      setArticles(prev => refresh ? response.articles : [...prev, ...response.articles]);
      setTotalResults(response.totalResults);
      setHasMore(page * 10 < response.totalResults); // Check if there are more articles to load
    } catch (err) {
      console.error('Error fetching articles (DETAILED):', err);
      if (err instanceof Error) {
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // Reset and fetch when search parameters change
  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    fetchArticles(1, true);
  }, [params.q, params.category, fetchArticles]);

  // Load more articles
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchArticles(nextPage);
    }
  }, [isLoading, hasMore, page, fetchArticles]);

  // Update search parameters
  const updateParams = useCallback((newParams: Partial<SearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return {
    articles,
    isLoading,
    error,
    hasMore,
    loadMore,
    updateParams,
    totalResults
  };
};