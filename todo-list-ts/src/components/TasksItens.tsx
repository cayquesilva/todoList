import { ClipboardText } from "@phosphor-icons/react";
import { v4 as uuidv4} from 'uuid';
import style from './TasksItens.module.css';
import { UniqueTask } from "./UniqueTask";
import { useState } from "react";

export function TaskItens(){

    const [tasks, setTasks] = useState([
        {
            id: uuidv4(),
            title: "Terminar o desafio",
            isComplete: true
        },
        {
            id: uuidv4(),
            title: "Fazer o segundo desafio",
            isComplete: false
        }
    ])

    function changeCompleteStatus(id: string){
        //transforma a lista de tasks a partir do map
        setTasks(tasks.map(
            //caso o task.id for igual ao id passado no componente, vai retornar a lista anterior com a task iscomplete por seu inverso, senão retorna lista sem alteração.
            (task) => task.id === id ? 
                { 
                    ...task, 
                    isComplete: !task.isComplete 
                } 
                : task
        ))
    }


    return(
        <>
            <div className={style.flex}>
                <div className={style.notask}>
                    <ClipboardText size={56} color="var(--gray-400)" weight="thin"/>
                    <div className={style.textbox}>
                        <h3>Você ainda não tem tarefas cadastradas</h3>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                </div>

                {tasks.map(task => {
                    return (
                        <UniqueTask key={task.id}
                            id={task.id}
                            isComplete={task.isComplete}
                            title={task.title}
                            onChangeCompleteStatus={() => changeCompleteStatus(task.id)}
                        />
                    )
                })}

            </div>
        </>
    )
}