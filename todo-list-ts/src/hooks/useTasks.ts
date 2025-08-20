import { useState, useEffect } from 'react'
import { supabase, Task } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Carregar tarefas do banco
  const fetchTasks = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Criar nova tarefa
  const createTask = async (title: string) => {
    if (!user || !title.trim()) return

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: title.trim(),
            user_id: user.id,
            is_complete: false
          }
        ])
        .select()
        .single()

      if (error) throw error
      setTasks(prev => [data, ...prev])
      return { success: true }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
      return { success: false, error }
    }
  }

  // Atualizar status da tarefa
  const updateTaskStatus = async (id: string, isComplete: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete: isComplete })
        .eq('id', id)

      if (error) throw error

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, is_complete: isComplete } : task
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  // Deletar tarefa
  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
    } else {
      setTasks([])
      setLoading(false)
    }
  }, [user])

  const completedTasks = tasks.filter(task => task.is_complete).length
  const totalTasks = tasks.length

  return {
    tasks,
    loading,
    completedTasks,
    totalTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    refetch: fetchTasks
  }
}