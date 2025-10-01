import React from 'react';

const TaskSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-start space-x-4">
        {/* Checkbox skeleton */}
        <div className="flex-shrink-0 pt-1">
          <div className="w-5 h-5 bg-gray-200 rounded border-2"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              
              {/* Description skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              
              {/* Date skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
};

export { TaskSkeleton, TaskListSkeleton };