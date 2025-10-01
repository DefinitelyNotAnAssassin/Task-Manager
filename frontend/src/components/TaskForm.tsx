import React from 'react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialDescription = '',
  isEditing = false
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDescription);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setIsExpanded(isEditing || initialTitle !== '' || initialDescription !== '');
  }, [initialTitle, initialDescription, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      if (!isEditing) {
        setTitle('');
        setDescription('');
        setIsExpanded(false);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Quick Input or Expanded Form */}
          {!isExpanded && !isEditing ? (
            <div 
              onClick={() => setIsExpanded(true)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-text transition-all duration-200 hover:bg-gray-100 hover:border-gray-300 flex items-center space-x-3"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-gray-400">What needs to be done?</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Title Input */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Task Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400"
                    placeholder="Enter task title..."
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                  <span className="text-gray-400 ml-1">(optional)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 resize-none"
                  placeholder="Add more details about this task..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{isEditing ? 'Update Task' : 'Create Task'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;