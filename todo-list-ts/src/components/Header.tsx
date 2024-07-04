import styles from './Header.module.css'
import { ListChecks } from '@phosphor-icons/react';

export function Header(){
    return (
        <header className={styles.header}>
            <ListChecks size={32} weight="fill" color="#4EA8DE"/>
            <span>todo</span>
        </header>
    );
}