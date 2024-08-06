import { CheckCircle, Circle, Trash } from '@phosphor-icons/react';
import style from './UniqueTask.module.css';

interface UniqueTaskProps {
    id: string,
    title: string,
    isComplete: boolean,
    onChangeCompleteStatus: () => void;
    onDeleteTask: () => void;
}

export function UniqueTask({ id, title, isComplete, onChangeCompleteStatus, onDeleteTask }: UniqueTaskProps) {
    return (
        <>
            <div className={style.taskbox} id={id}>
                {isComplete ? (
                    <button className={style.button} onClick={onChangeCompleteStatus}>
                        <CheckCircle size={32} color="#4EA8DE" weight="fill" />
                    </button>
                ) : (
                    <button className={style.button} onClick={onChangeCompleteStatus}>
                        <Circle size={32} color="#4EA8DE" weight="thin" />
                    </button>
                )}
                <p className={`${style.text_task} ${isComplete ? style.completed : ''}`}>{title}</p>
                <button className={style.button} onClick={onDeleteTask}>
                    <Trash size={32} color="#808080" weight="thin" />
                </button>
            </div>
        </>
    )
}
