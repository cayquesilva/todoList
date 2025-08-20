import { useState, useEffect } from 'react';
import { apiClient, Task } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Carregar tarefas da API
  const fetchTasks = async () => {
    if (!user) return;

    try {
      const data = await apiClient.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Criar nova tarefa
  const createTask = async (title: string) => {
    if (!user || !title.trim()) return { success: false };

    try {
      const newTask = await apiClient.createTask(title.trim());
      setTasks(prev => [newTask, ...prev]);
      return { success: true };
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      return { success: false, error };
    }
  };

  // Atualizar status da tarefa
  const updateTaskStatus = async (id: string, isComplete: boolean) => {
    try {
      const updatedTask = await apiClient.updateTask(id, isComplete);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // Deletar tarefa
  const deleteTask = async (id: string) => {
    try {
      await apiClient.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const completedTasks = tasks.filter(task => task.is_complete).length;
  const totalTasks = tasks.length;

  return {
    tasks,
    loading,
    completedTasks,
    totalTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    refetch: fetchTasks
  };
}