import { IconTrash } from '@tabler/icons-react';
import { Task } from "@/store"
import { formatTime } from '@/utils/time';
import styles from './styles.module.css';

type Props = {
    task: Task;
    onDelete: (task: Task) => void;
}

export function TaskCard({ task, onDelete }: Props) {
    return (
        <div className={`${styles.card} ${task.completed && styles.completed}`}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                    {task.title}
                </div>

                <div className={styles.cardDuration}>
                    {formatTime(task.duration)}
                </div>
            </div>
            <div className={styles.cardDescription}>
                {task.description}
            </div>
            <div className={styles.cardFooter}>
                <button
                    className={styles.deleteBtn}
                    aria-label='Delete task'
                    onClick={() => onDelete(task)}
                >
                    <IconTrash width={16} />
                </button>
            </div>
        </div>
    )
}
