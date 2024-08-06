import { CheckCircle, Circle, Trash } from '@phosphor-icons/react';
import style from './UniqueTask.module.css';

interface UniqueTaskProps{
    id: string,
    title: string,
    isComplete: boolean,
    onChangeCompleteStatus: () => void;
}

export function UniqueTask({...props}: UniqueTaskProps){

    return (
        <>
            <div className={style.taskbox} id={props.id}>
                {props.isComplete ?(
                    <button className={style.button} onClick={props.onChangeCompleteStatus}>
                        <CheckCircle size={32} color="#4EA8DE" weight="fill" />
                    </button>
                ):(
                    <button className={style.button} onClick={props.onChangeCompleteStatus}>
                        <Circle size={32} color="#4EA8DE" weight="thin" />
                    </button>
                )}
                <p className={style.text_task}>{props.title}</p>
                <Trash size={32} color="#808080" weight="thin"/>
            </div>
        </>
    )
}