import axios from 'axios';
import { ArticleResponse, SearchParams } from '../types';

// Base URL for API calls - use relative paths with Vite proxy
const API_BASE_URL = ''; // Empty base URL to use the proxy

// Log API URL configuration
console.log('Using API proxy configuration for backend requests');

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get news highlights from the backend
 * @param category Optional category to filter highlights
 * @returns Promise with highlights data
 */
export const getHighlights = async (category?: string) => {
  const url = `/api/highlights${category ? `?category=${category}` : ''}`;
  const { data } = await apiClient.get(url);
  return data.highlights;
};

/**
 * Get articles from the backend API
 * @param params Search parameters
 * @returns Promise with article response
 */
export const getArticles = async (params: SearchParams): Promise<ArticleResponse> => {
  // Construct query string for GET request
  const queryParams = new URLSearchParams();
  
  // Add search parameters if they exist
  if (params.q) queryParams.append('q', params.q);
  if (params.category && params.category !== 'general') queryParams.append('category', params.category);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
  
  // Make the API request
  const url = `/api/articles?${queryParams.toString()}`;
  console.log(`Making API request to ${API_BASE_URL}${url}`);
  
  try {
    const { data } = await apiClient.get(url);
    console.log('API response received:', data);
    
    // Validate that the articles array exists
    if (!data.articles || !Array.isArray(data.articles)) {
      console.error('Invalid articles data received:', data);
      return { articles: [], totalResults: 0 };
    }
    
    // Make sure each article has the required fields
    const articles = data.articles.map((article: any) => {
      return {
        id: article.id || '',
        title: article.title || '',
        description: article.description || '',
        content: article.content || '',
        source: article.source || { id: '', name: '' },
        author: article.author || '',
        url: article.url || '',
        urlToImage: article.urlToImage || '',
        publishedAt: article.publishedAt || '',
        category: article.category || 'general'
      };
    });
    
    return {
      articles,
      totalResults: data.totalResults || articles.length
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

/**
 * Ask a question to the news chatbot
 * @param question The question to ask
 * @returns Promise with answer and sources
 */
export const askQuestion = async (question: string) => {
  console.log('Sending question to chatbot API:', question);
  try {
    const response = await apiClient.post('/api/chat', { question });
    console.log('Raw chatbot response:', response);
    console.log('Chat data received:', response.data);
    
    // Validate that response.data contains the expected fields
    if (!response.data || !response.data.answer) {
      console.error('Invalid chat response format:', response.data);
      throw new Error('Invalid response format from chat API');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error in askQuestion function:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

/**
 * Trigger reprocessing of news data
 * @param params Optional parameters for processing
 * @returns Promise with processing result
 */
export const processNews = async (params?: { news_csv_path?: string; highlights_csv_path?: string }) => {
  const { data } = await apiClient.post('/api/process', params || {});
  return data;
};

export default {
  getHighlights,
  getArticles,
  askQuestion,
  processNews,
}; 