import { useState, FormEvent } from 'react'
import { PlusCircle } from '@phosphor-icons/react'
import { useTasks } from '../hooks/useTasks'
import { TaskHeader } from './TasksHeader'
import { TasksItens } from './TasksItens'
import style from './Tasks.module.css'

export function Tasks() {
    const [newTaskText, setNewTaskText] = useState('')
    const { 
        tasks, 
        loading, 
        completedTasks, 
        totalTasks, 
        createTask, 
        updateTaskStatus, 
        deleteTask 
    } = useTasks()

    async function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()
        
        if (!newTaskText.trim()) return

        const result = await createTask(newTaskText)
        
        if (result.success) {
            setNewTaskText('')
        }
    }

    function handleToggleTaskComplete(id: string, currentStatus: boolean) {
        updateTaskStatus(id, !currentStatus)
    }

    function handleDeleteTask(id: string) {
        deleteTask(id)
    }

    if (loading) {
        return (
            <div className={style.tasks}>
                <div className={style.add_comment}>
                    <form className={style.form_comment}>
                        <input 
                            className={style.input}
                            placeholder="Carregando..."
                            disabled
                        />
                        <button type="submit" disabled>
                            <PlusCircle size={16} />
                            Criar
                        </button>
                    </form>
                </div>
                <TaskHeader qtdConcluidas={0} qtdTarefas={0} />
                <div style={{ textAlign: 'center', color: 'var(--gray-300)', marginTop: '2rem' }}>
                    Carregando tarefas...
                </div>
            </div>
        )
    }

    return (
        <div className={style.tasks}>
            <div className={style.add_comment}>
                <form onSubmit={handleCreateNewTask} className={style.form_comment}>
                    <input 
                        className={style.input}
                        placeholder="Adicione uma nova tarefa"
                        value={newTaskText}
                        onChange={(event) => setNewTaskText(event.target.value)}
                    />
                    <button type="submit">
                        <PlusCircle size={16} />
                        Criar
                    </button>
                </form>
            </div>

            <TaskHeader qtdConcluidas={completedTasks} qtdTarefas={totalTasks} />
            
            <TasksItens 
                tasks={tasks}
                onToggleComplete={handleToggleTaskComplete}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    )
}