'use client';

import { useStore, Task } from '@/store';
import { useEffect, useState } from 'react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { Header, TaskCard, Timer, TimerHeader } from '@/components';
import { TaskForm, Output } from '@/containers';
import styles from './styles.module.css';

export function TasksContainer() {
    const [started, setStarted] = useState(false); // TODO: SET TO FALSE BY DEFAULT

    const { activeTask, tasks, addTask, completeTask, removeTask, setActiveTask } = useStore();

    const setActive = () => {
        const nextTask = tasks.find(task => task.completed === false);
        if (nextTask) {
            setActiveTask(nextTask.id);
        }
    }

    const start = () => {
        setStarted(true);
    }

    const nextTaskOrFinish = (task: Task | null) => {
        if (!task) return;
        completeTask(task.id)
    };

    const submitHandler = (data: Output) => {
        addTask(data);
    }

    useEffect(() => {
        setActive();
    }, [tasks]);

    return (
        <div className={styles.content}>
            <div className={styles.tasksList}>
                <div className={styles.list}>
                    {tasks.length > 0 ? (
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index}>
                                    <TaskCard task={task} onDelete={(task) => removeTask(task.id)} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={styles.empty}>
                            <p>Add your first task</p>
                        </div>
                    )}
                </div>

                <div className={styles.form}>
                    <TaskForm onSubmit={submitHandler} />
                </div>
            </div>

            <div className={styles.timerContainer}>
                <div className={styles.header}>
                    <Header />
                </div>

                {activeTask?.id && started 
                    ? <div>
                        <TimerHeader 
                            title={activeTask.title}
                            description={activeTask.description} 
                            duration={activeTask.duration}
                        />
                        <Timer 
                            key={activeTask.id}
                            duration={activeTask.duration} 
                            onExpire={() => nextTaskOrFinish(activeTask)} 
                        /> 
                    </div>
                    : <div>
                        <TimerHeader 
                            title="No task"
                            description="..."
                            duration={0}
                        />
                        <Timer duration={0} disabled /> 
                    </div>
                }

                <button className={styles.startBtn} onClick={start}>
                    <IconPlayerPlayFilled />
                    START
                </button>
            </div>
        </div>
    )
}
