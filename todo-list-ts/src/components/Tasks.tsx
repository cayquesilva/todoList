import { TaskHeader } from "./TasksHeader";
import { TaskItens } from "./TasksItens";
import { PlusCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import style from './Tasks.module.css';
import { v4 as uuidv4 } from 'uuid';

export function Tasks() {
    const [titulo, setTitulo] = useState('');
    const [tasks, setTasks] = useState<{ id: string, title: string, isComplete: boolean }[]>([]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    function handleChangeTitulo(e: React.ChangeEvent<HTMLInputElement>) {
        setTitulo(e.target.value);
    }
    
    function handleOnSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            title: titulo,
            isComplete: false
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setTitulo('');
    }

    function changeCompleteStatus(id: string) {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(updatedTasks);
    }

    function deleteTask(id: string){
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
    }

    //atualiza renderização sempre que tasks for alterado de alguma forma...
    useEffect(() => {
        setTotalTasks(tasks.length);
        setCompletedTasks(tasks.filter(task => task.isComplete).length);
    }, [tasks]);

    return (
        <>
            <div className={style.add_comment}>
                <form className={style.form_comment} onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        onChange={handleChangeTitulo} 
                        value={titulo} 
                        className={style.input} 
                        placeholder='Adicione uma nova tarefa' 
                    />
                    <button type='submit'>
                        Criar <PlusCircle size={18} weight="bold" />
                    </button>
                </form>
            </div>
            <div className={style.tasks}>
                <TaskHeader qtdTarefas={totalTasks} qtdConcluidas={completedTasks}/>
                <TaskItens tasks={tasks} onChangeCompleteStatus={changeCompleteStatus} onDeleteTask={deleteTask}/>
            </div>
        </>
    )
}
