import { AddTask } from './AddTask';
import style from './Main.module.css';
import { Tasks } from './Tasks';

export function Main(){
    return(
        <>
            <div className={style.main}>
                <AddTask />
                <Tasks />
            </div>
        </>
    )
}