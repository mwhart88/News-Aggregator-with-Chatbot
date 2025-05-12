import React, { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { X, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { Article } from '../../types';

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  // Handle keyboard events (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling of background content
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
              {article.source.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share article"
            >
              <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Bookmark article"
            >
              <Bookmark size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open original article"
            >
              <ExternalLink size={18} className="text-gray-600 dark:text-gray-400" />
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span className="font-medium">{article.author || 'Unknown'}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          {article.urlToImage && (
            <div className="mb-6">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full max-h-96 object-cover rounded-lg"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500 italic">
                Image: {article.source.name}
              </p>
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
              {article.description}
            </p>
            
            {article.content ? (
              <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {article.content}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is a preview. To read the full article, please visit the original source.
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Read full article
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;