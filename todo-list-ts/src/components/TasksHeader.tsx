import style from './TasksHeader.module.css';

export function TaskHeader(){
    return(
        <>
            <div className={style.list}>
                <div className={style.flex}>
                    <h4 className={style.textblue}>Tarefas criadas</h4>
                    <span className={style.badge}>0</span>
                </div>
                <div className={style.flex}>
                    <h4 className={style.textpurple}>Concluídas</h4>
                    <span className={style.badge}>0</span>
                </div>
            </div>
        </>
    )
}