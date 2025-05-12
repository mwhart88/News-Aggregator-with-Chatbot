import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArticleCard from '../components/Articles/ArticleCard';
import { Article } from '../types';

// Mock article data
const mockArticle: Article = {
  id: '1',
  title: 'Test Article Title',
  description: 'This is a test description for the article',
  source: {
    id: 'test-source',
    name: 'Test Source'
  },
  author: 'John Doe',
  url: 'https://example.com/test-article',
  urlToImage: 'https://example.com/test-image.jpg',
  publishedAt: new Date().toISOString(),
  category: 'technology'
};

describe('ArticleCard', () => {
  it('renders the article title and description', () => {
    const mockOnClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} />);
    
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the article')).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('Test Article Title'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockArticle);
  });
  
  it('renders fallback image when image fails to load', () => {
    const mockOnClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} />);
    
    // Get the image and simulate an error
    const image = screen.getByAltText('Test Article Title');
    fireEvent.error(image);
    
    // Check if the src has been updated to the fallback URL
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300x200?text=No+Image');
  });
  
  it('renders featured variant with larger image', () => {
    const mockOnClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} variant="featured" />);
    
    // Featured variant should have a larger image container
    const imageContainer = screen.getByAltText('Test Article Title').closest('div');
    expect(imageContainer).toHaveClass('h-64');
  });
  
  it('renders compact variant with smaller format', () => {
    const mockOnClick = vi.fn();
    render(<ArticleCard article={mockArticle} onClick={mockOnClick} variant="compact" />);
    
    // Compact variant has a specific layout
    const container = screen.getByText('Test Article Title').closest('div');
    expect(container).toHaveClass('flex');
  });
});