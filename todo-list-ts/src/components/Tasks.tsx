import { TaskHeader } from "./TasksHeader";
import { TaskItens } from "./TasksItens";
import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import style from './Tasks.module.css';
import { v4 as uuidv4 } from 'uuid';

export function Tasks() {
    const [titulo, setTitulo] = useState('');
    const [tasks, setTasks] = useState<{ id: string, title: string, isComplete: boolean }[]>([]);

    function handleChangeTitulo(e: React.ChangeEvent<HTMLInputElement>) {
        setTitulo(e.target.value);
    }

    function handleOnSubmit() {
        setTasks([...tasks, {
            id: uuidv4(),
            title: titulo,
            isComplete: false
        }]);
        setTitulo('');
    }

    function changeCompleteStatus(id: string) {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <>
            <div className={style.add_comment}>
                <input type="text" onChange={handleChangeTitulo} value={titulo} className={style.input} placeholder='Adicione uma nova tarefa' />
                <button type='submit' onClick={handleOnSubmit}>Criar <PlusCircle size={18} weight="bold" /></button>
            </div>
            <div className={style.tasks}>
                <TaskHeader />
                <TaskItens tasks={tasks} onChangeCompleteStatus={changeCompleteStatus} />
            </div>
        </>
    )
}
