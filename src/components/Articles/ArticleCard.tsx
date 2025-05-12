import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  variant?: 'normal' | 'featured' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick,
  variant = 'normal' 
}) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  const imageFallback = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div 
      className="flex items-start py-4 px-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={() => onClick(article)}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span className="font-medium">{article.source.name}</span>
          <span className="mx-1.5">•</span>
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 leading-5 mb-1">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {article.description}
        </p>
      </div>
      {article.urlToImage && (
        <div className="flex-shrink-0 w-24 h-24">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = imageFallback;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleCard;