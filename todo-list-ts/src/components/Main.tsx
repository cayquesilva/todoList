import { PlusCircle } from '@phosphor-icons/react';
import style from './Main.module.css';

export function Main(){
    return(
        <>
            <div className={style.main}>
                <div className={style.add_comment}>
                    <input type="text" className={style.input} placeholder='Adicione uma nova tarefa'/>
                    <button type='submit'>Criar <PlusCircle size={18} weight="bold"/></button>
                </div>
            </div>
        </>
    )
}