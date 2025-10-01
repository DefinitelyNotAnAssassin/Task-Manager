import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/tasks';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
}

class TaskService {

  static async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  static async createTask(task: Omit<Task, 'id' | 'created_at'>): Promise<Task> {
    try {
      const response = await axios.post(`${API_BASE_URL}/`, task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  static async getTaskById(id: number): Promise<Task> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  }

  // Update a task (PUT)
  static async updateTask(id: number, task: Omit<Task, 'id' | 'created_at'>): Promise<Task> {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/`, task);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Toggle task completion status (PATCH)
  static async toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/`, { completed });
      return response.data;
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  }

  static async deleteTask(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}/`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default TaskService;