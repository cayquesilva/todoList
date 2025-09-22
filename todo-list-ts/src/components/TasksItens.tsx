import { UniqueTask } from './UniqueTask'
import { ClipboardText } from '@phosphor-icons/react'
import style from './TasksItens.module.css'
import type { Task } from '../lib/supabase'

interface TasksItensProps {
    tasks: Task[]
    onToggleComplete: (id: string, currentStatus: boolean) => void
    onDeleteTask: (id: string) => void
}

export function TasksItens({ tasks, onToggleComplete, onDeleteTask }: TasksItensProps) {
    if (tasks.length === 0) {
        return (
            <div className={style.flex}>
                <div className={style.notask}>
                    <ClipboardText size={56} color="#3D3D3D" />
                    <div className={style.textbox}>
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={style.flex}>
            {tasks.map(task => (
                <UniqueTask
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isComplete={task.is_complete}
                    onChangeCompleteStatus={() => onToggleComplete(task.id, task.is_complete)}
                    onDeleteTask={() => onDeleteTask(task.id)}
                />
            ))}
        </div>
    )
}