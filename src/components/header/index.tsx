import Image from "next/image";
import styles from './styles.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <div>
                <a href="https://edcilo.com">
                    <Image 
                        src="/assets/edcilo-logo-clear.svg" 
                        width={100} 
                        height={32}
                        alt="edcilo" />
                </a>
            </div>

            <div className={styles.version}>
                v0.1.0
            </div>
        </header>
    )
}
