import style from './Tasks.module.css';

export function Tasks(){
    return(
        <>
            <div className={style.list}>
                <div className={style.header}>
                    <h4>Tarefas criadas</h4>
                    <h4>Concluídas</h4>
                </div>
            </div>
        </>
    )
}