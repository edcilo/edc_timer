'use client';

import { useStore, Task } from '@/store';
import { useEffect, useState } from 'react';
import { Timer } from '@/components';

export function TasksContainer() {
    const [started, setStarted] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);

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

    useEffect(() => {
        setActive();
    }, [tasks]);

    return (
        <div className='tasks'>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            {task.title}: {task.description} ({task.duration})
                            {task.completed ? "COMPLETED" : null}
                            <button onClick={() => removeTask(task.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : null}

            <div className='add-task'>
                <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                <input type='text' onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <input type='text' onChange={(e) => setDuration(+e.target.value)} placeholder='Duration' />
                <button onClick={() => {
                    addTask({
                        title,
                        description,
                        duration
                    })

                    setTitle("");
                    setDescription("");
                    setDuration(0);
                }}>Add</button>
            </div>

            <div className='start'>
                <button onClick={start}>FINISH</button>
            </div>

            {activeTask?.id && started 
                ? <>
                    --{activeTask.title}--
                    !!{activeTask.duration}??
                    <Timer duration={activeTask.duration} onExpire={() => nextTaskOrFinish(activeTask)} /> 
                </>
                : null 
            }
        </div>
    )
}
