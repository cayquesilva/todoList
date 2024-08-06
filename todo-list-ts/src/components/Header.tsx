import styles from './Header.module.css'

export function Header(){
    return (
        <header className={styles.header}>
            <img src="./tasks.svg" alt="tasks" className={styles.img}/>
            <span>Minhas Tarefas</span>
        </header>
    );
}