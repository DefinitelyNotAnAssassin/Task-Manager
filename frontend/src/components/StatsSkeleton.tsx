import React from 'react';

const StatsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-16 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;