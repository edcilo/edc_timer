import { formatTime } from '@/utils/time';
import styles from './styles.module.css';

type Props = {
    title: string;
    description: string;
    duration: number; // in seconds
}

export function TimerHeader({ title, description, duration }: Props) {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>
                {title || (<span>&nbsp;</span>)}
            </h1>
            <h2 className={styles.description}>
                {description || (<span>&nbsp;</span>)}
            </h2>
            <h3 className={styles.duration}>
                -- {formatTime(duration)} --
            </h3>
        </div>
    )
}
