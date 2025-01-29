'use client';

import { timeToSeconds } from '@/utils/time';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconAlarmPlus } from '@tabler/icons-react';
import styles from './styles.module.css';

type Inputs = {
    title: string;
    description: string;
    hours: number;
    minutes: number;
    seconds: number;
}

export type Output = {
    title: string;
    description: string;
    duration: number;
}

type Props = {
    onSubmit: (data: Output) => void;
}

export function TaskForm({ onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<Inputs>();

    const submitHandler: SubmitHandler<Inputs> = (data) => {
        onSubmit({
            title: data.title,
            description: data.description,
            duration: timeToSeconds(data)
        });

        reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
            <div className={styles.ctrls}>
                <div className={styles.inputCtrl}>
                    <input 
                        type="text" 
                        className={`peer ${styles.input}`}
                        placeholder=" "
                        {...register("title")}
                    />
                    <label className={styles.label}>
                        Task name:
                    </label>
                </div>

                <div className={styles.inputCtrl}>
                    <input 
                        type="text"
                        className={styles.input}
                        placeholder=" "
                        {...register("description")}
                    />
                    <label className={styles.label}>
                        Description:
                    </label>
                </div>

                <div className={styles.timeInputs}>
                    <div className={styles.inputCtrl}>
                        <input 
                            type="number"
                            className={styles.input}
                            min={0}
                            {...register("hours")}
                        />
                        <label className={styles.label}>
                            Hours:
                        </label>
                    </div>

                    <span className={styles.timeSeparator}>:</span>

                    <div className={styles.inputCtrl}>
                        <input
                            type="number"
                            className={styles.input}
                            max={59}
                            min={0}
                            {...register("minutes")}
                        />
                        <label className={styles.label}>
                            Minutes:
                        </label>
                    </div>
                    
                    <span className={styles.timeSeparator}>:</span>

                    <div className={styles.inputCtrl}>
                        <input
                            type="number"
                            className={styles.input}
                            step={10}
                            max={59}
                            min={0}
                            {...register("seconds")}
                        />
                        <label className={styles.label}>
                            Seconds:
                        </label>
                    </div>
                </div>
            </div>

            <button type="submit" className={styles.button}>
                <IconAlarmPlus />
            </button>
        </form>
    )
}
