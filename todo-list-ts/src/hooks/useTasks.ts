import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Task } from '../lib/supabase'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Carregar tarefas do Supabase
  const fetchTasks = async () => {
    if (!user) {
      setTasks([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar tarefas:', error)
        return
      }

      setTasks(data || [])
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Criar nova tarefa
  const createTask = async (title: string) => {
    if (!user || !title.trim()) return { success: false }

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

      if (error) {
        console.error('Erro ao criar tarefa:', error)
        return { success: false, error }
      }

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
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: isComplete })
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar tarefa:', error)
        return
      }

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? data : task
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
        .eq('user_id', user?.id)

      if (error) {
        console.error('Erro ao deletar tarefa:', error)
        return
      }

      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
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