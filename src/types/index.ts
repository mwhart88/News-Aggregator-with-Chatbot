// Article-related types
export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  category: Category;
}

// Category types
export type Category = 
  | 'general'
  | 'sports'
  | 'finance'
  | 'politics'
  | 'lifestyle'
  | 'music';

export interface CategoryOption {
  id: Category;
  label: string;
}

// API response types
export interface ArticleResponse {
  articles: Article[];
  totalResults: number;
}

// Search related types
export interface SearchParams {
  q?: string;
  category?: Category;
  page?: number;
  pageSize?: number;
}

// User preferences
export interface UserPreferences {
  preferredCategories: Category[];
  excludedSources: string[];
  darkMode: boolean;
  fontSize: string;
  enableNotifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}