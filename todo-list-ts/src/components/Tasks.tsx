import { TaskHeader } from "./TasksHeader";
import style from './Tasks.module.css';
import { TaskItens } from "./TasksItens";

export function Tasks(){
    return(
        <>
            <div className={style.tasks}>
                <TaskHeader/>
                <TaskItens/>
            </div>
        </>
    )
}