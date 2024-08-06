import style from './Main.module.css';
import { Tasks } from './Tasks';

export function Main(){
    return(
        <>
            <div className={style.main}>
                <Tasks/>
            </div>
        </>
    )
}