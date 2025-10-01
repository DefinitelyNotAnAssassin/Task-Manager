import React from 'react';

export const TaskListSkeleton: React.FC = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                            {/* Checkbox skeleton */}
                            <div className="w-5 h-5 bg-gray-200 rounded border mt-1"></div>
                            
                            {/* Content skeleton */}
                            <div className="flex-1">
                                {/* Title skeleton */}
                                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                                {/* Description skeleton */}
                                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                                {/* Date skeleton */}
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                        
                        {/* Actions skeleton */}
                        <div className="flex space-x-2 ml-4">
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskListSkeleton;