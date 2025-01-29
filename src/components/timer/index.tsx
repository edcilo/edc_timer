'use client';

import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { addSeconds } from 'date-fns';
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackPrev } from '@tabler/icons-react';
import styles from './styles.module.css';

type Props = {
    duration: number;
    disabled?: boolean;
    onExpire?: () => void;
}

export function Timer({ duration, disabled=false, onExpire=() => undefined }: Props) {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
        resume,
        restart
    } = useTimer({
        autoStart: true,
        expiryTimestamp: addSeconds(new Date(), duration),
        onExpire
    });

    useEffect(() => {
        restart(addSeconds(new Date(), duration));
    }, [duration]);

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timer}>
                {String(hours).padStart(2, '0')}:
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </div>
            <div className={styles.btnsContainer}>
                {isRunning 
                    ? (
                        <button 
                            onClick={pause} 
                            className={styles.button}
                            disabled={disabled}
                            aria-label="pause"
                        >
                            <IconPlayerPause size={24} stroke={2} />
                        </button>
                    ) : (
                        <button 
                            onClick={resume} 
                            className={styles.button}
                            disabled={disabled}
                            aria-label="play"
                        >
                            <IconPlayerPlay size={24} stroke={2} />
                        </button>
                    )
                }
                <button 
                    onClick={() => { restart(addSeconds(new Date(), duration))}}
                    className={styles.button}
                    disabled={disabled}
                    aria-label="reset"
                >
                    <IconPlayerTrackPrev size={24} stroke={2} />
                </button>
            </div>
        </div>
    )
}
