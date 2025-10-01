import { useState, useEffect } from 'react';
import TaskService, { Task } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function LandingPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    // Load tasks on component mount
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedTasks = await TaskService.getAllTasks();
            setTasks(fetchedTasks);
        } catch (err) {
            setError('Failed to load tasks. Please make sure the backend server is running.');
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (title: string, description: string) => {
        try {
            setError(null);
            const newTask = await TaskService.createTask({
                title,
                description,
                completed: false
            });
            setTasks(prev => [newTask, ...prev]);
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error('Error creating task:', err);
        }
    };

    const handleEditTask = async (title: string, description: string) => {
        if (!editingTask?.id) return;

        try {
            setError(null);
            const updatedTask = await TaskService.updateTask(editingTask.id, {
                title,
                description,
                completed: editingTask.completed
            });
            setTasks(prev => prev.map(task => 
                task.id === editingTask.id ? updatedTask : task
            ));
            setEditingTask(null);
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error('Error updating task:', err);
        }
    };

    const handleToggleComplete = async (id: number, completed: boolean) => {
        try {
            setError(null);
            const updatedTask = await TaskService.toggleTaskCompletion(id, completed);
            setTasks(prev => prev.map(task => 
                task.id === id ? updatedTask : task
            ));
        } catch (err) {
            setError('Failed to update task status. Please try again.');
            console.error('Error toggling task completion:', err);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            setError(null);
            await TaskService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task. Please try again.');
            console.error('Error deleting task:', err);
        }
    };

    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);
    
    const filteredTasks = 
        filter === 'completed' ? completedTasks :
        filter === 'pending' ? pendingTasks :
        tasks;

    const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-3 bg-gray-900 rounded-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        YAHSHUA HRIS Task Manager
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay organized and productive with our simple task management system
                    </p>
                </header>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 mx-auto max-w-2xl">
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="font-medium">{error}</p>
                            </div>
                            <button 
                                onClick={loadTasks}
                                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-3xl font-bold text-orange-600">{pendingTasks.length}</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-green-600">{completedTasks.length}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                                <p className="text-3xl font-bold text-blue-600">{completionRate}%</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Task Form */}
                <TaskForm
                    onSubmit={editingTask ? handleEditTask : handleCreateTask}
                    onCancel={editingTask ? () => setEditingTask(null) : undefined}
                    initialTitle={editingTask?.title || ''}
                    initialDescription={editingTask?.description || ''}
                    isEditing={!!editingTask}
                />

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(['all', 'pending', 'completed'] as const).map((filterOption) => (
                        <button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                filter === filterOption
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                            <span className="ml-2 text-sm">
                                ({filterOption === 'all' ? tasks.length : 
                                  filterOption === 'pending' ? pendingTasks.length : 
                                  completedTasks.length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <span className="text-gray-600 font-medium">Loading tasks...</span>
                        </div>
                    </div>
                ) : (
                    /* Task List */
                    <div className="space-y-4">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggleComplete={handleToggleComplete}
                                    onEdit={setEditingTask}
                                    onDelete={handleDeleteTask}
                                />
                            ))
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {filter === 'all' ? 'No tasks yet' : 
                                     filter === 'pending' ? 'No pending tasks' : 
                                     'No completed tasks'}
                                </h3>
                                <p className="text-gray-600">
                                    {filter === 'all' ? 'Create your first task to get started!' :
                                     filter === 'pending' ? 'All tasks are completed!' :
                                     'Complete some tasks to see them here.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}