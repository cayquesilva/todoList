import { ClipboardText } from "@phosphor-icons/react";
import style from './TasksItens.module.css';
import { UniqueTask } from "./UniqueTask";

interface TaskItensProps {
    tasks: {
        id: string,
        title: string,
        isComplete: boolean
    }[],
    onChangeCompleteStatus: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function TaskItens({ tasks, onChangeCompleteStatus, onDeleteTask }: TaskItensProps) {

    return (
        <div className={style.flex}>
            {tasks.length === 0 ? (
                <div className={style.notask}>
                    <ClipboardText size={56} color="var(--gray-400)" weight="thin" />
                    <div className={style.textbox}>
                        <h3>Você ainda não tem tarefas cadastradas</h3>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                </div>
            ) : (
                tasks.map((task) => (
                    <UniqueTask key={task.id}
                        id={task.id}
                        isComplete={task.isComplete}
                        title={task.title}
                        onChangeCompleteStatus={() => onChangeCompleteStatus(task.id)}
                        onDeleteTask={() => onDeleteTask(task.id)}
                    />
                ))
            )}
        </div>
    )
}
