import React from 'react';

interface LoadingSkeletonProps {
  type: 'article' | 'text' | 'image' | 'profile';
  lines?: number;
  height?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type, 
  lines = 3,
  height = 'h-4' 
}) => {
  const baseClass = "bg-gray-200 dark:bg-gray-700 rounded animate-pulse";
  
  if (type === 'text') {
    return (
      <div className="space-y-2 w-full">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={`${baseClass} ${height} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          ></div>
        ))}
      </div>
    );
  }
  
  if (type === 'image') {
    return (
      <div className={`${baseClass} w-full h-40`}></div>
    );
  }
  
  if (type === 'profile') {
    return (
      <div className="flex items-center space-x-4">
        <div className={`${baseClass} w-12 h-12 rounded-full`}></div>
        <div className="space-y-2 flex-1">
          <div className={`${baseClass} h-4 w-1/3`}></div>
          <div className={`${baseClass} h-3 w-2/3`}></div>
        </div>
      </div>
    );
  }
  
  // Default 'article' type
  return (
    <div className="h-full rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <div className={`${baseClass} w-full h-40`}></div>
      <div className="p-4 space-y-3">
        <div className={`${baseClass} h-3 w-1/4`}></div>
        <div className={`${baseClass} h-6 w-full`}></div>
        <div className={`${baseClass} h-6 w-5/6`}></div>
        <div className={`${baseClass} h-4 w-full`}></div>
        <div className={`${baseClass} h-4 w-2/3`}></div>
        <div className="flex justify-between pt-2">
          <div className={`${baseClass} h-3 w-1/3`}></div>
          <div className={`${baseClass} h-3 w-1/4`}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;