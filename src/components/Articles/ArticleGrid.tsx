import React, { useCallback, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';
import ArticleModal from './ArticleModal';
import LoadingSkeleton from '../UI/LoadingSkeleton';

interface ArticleGridProps {
  articles: Article[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ 
  articles, 
  isLoading, 
  hasMore, 
  loadMore 
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: isLoading ? articles.length + 3 : articles.length,
    getScrollElement: () => containerRef,
    estimateSize: useCallback(() => 120, []), // Reduced height for compact layout
    overscan: 5
  });

  const handleScroll = useCallback(() => {
    if (!containerRef) return;
    const { scrollHeight, scrollTop, clientHeight } = containerRef;
    if (scrollHeight - scrollTop - clientHeight < scrollHeight * 0.1 && hasMore && !isLoading) {
      loadMore();
    }
  }, [containerRef, hasMore, isLoading, loadMore]);

  React.useEffect(() => {
    const currentRef = containerRef;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      return () => currentRef.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef, handleScroll]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  return (
    <>
      <div 
        ref={setContainerRef}
        className="w-full h-full overflow-y-auto"
        style={{ height: 'calc(100vh - 120px)' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative'
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const article = articles[virtualRow.index];
            
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoading && !article ? (
                  <LoadingSkeleton type="article" />
                ) : (
                  article && (
                    <ArticleCard
                      article={article}
                      onClick={handleArticleClick}
                      variant="compact"
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          isOpen={!!selectedArticle} 
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
};

export default ArticleGrid;