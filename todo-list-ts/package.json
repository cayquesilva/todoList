import { useAuth } from '../contexts/AuthContext'
import { SignOut } from '@phosphor-icons/react'
import styles from './Header.module.css'

export function Header(){
    const { user, signOut } = useAuth()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <header className={styles.header}>
            <img src="./tasks.svg" alt="tasks" className={styles.img}/>
            <span>Minhas Tarefas</span>
            {user && (
                <div className={styles.userInfo}>
                    <span className={styles.userEmail}>{user.email}</span>
                    <button onClick={handleSignOut} className={styles.signOutButton}>
                        <SignOut size={20} />
                        Sair
                    </button>
                </div>
            )}
        </header>
    );
}