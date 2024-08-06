import style from './TasksHeader.module.css';

interface TaskHeaderProps{
    qtdTarefas: number,
    qtdConcluidas: number,
}

export function TaskHeader({qtdConcluidas, qtdTarefas}: TaskHeaderProps){
    return(
        <>
            <div className={style.list}>
                <div className={style.flex}>
                    <h4 className={style.textblue}>Tarefas criadas</h4>
                    <span className={style.badge}>{qtdTarefas}</span>
                </div>
                <div className={style.flex}>
                    <h4 className={style.textpurple}>Concluídas</h4>
                    <span className={style.badge}>{qtdConcluidas} de {qtdTarefas}</span>
                </div>
            </div>
        </>
    )
}