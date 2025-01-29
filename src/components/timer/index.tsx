'use client';

import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { addSeconds } from 'date-fns';
import { IconPlayerPause, IconPlayerPlay, IconPlayerTrackPrev } from '@tabler/icons-react';
import styles from './styles.module.css';

const TIMER_LENGTH = 3;
const TIMER_SOUND = '/media/timer_sound.mp3'

type Props = {
    duration: number;
    disabled?: boolean;
    onExpire?: () => void;
}

export function Timer({ duration, disabled=false, onExpire=() => undefined }: Props) {
    const [audio, setAudio] = useState<HTMLAudioElement|undefined>(undefined);
    const {
        totalSeconds,
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
        const audio = new Audio(TIMER_SOUND);
        audio.volume = 0.3;
        setAudio(audio);
    }, [setAudio]);

    useEffect(() => {
        restart(addSeconds(new Date(), duration));
    }, [duration]);

    useEffect(() => {
        if (totalSeconds === TIMER_LENGTH) {
            audio?.play();
        }
    }, [totalSeconds]);

    const pauseHandler = () => {
        pause();
        audio?.pause();
    }

    const resumeHandler = () => {
        resume();

        if (audio && totalSeconds <= TIMER_LENGTH) {
            audio.currentTime = TIMER_LENGTH - totalSeconds;
            audio.play();
        }
    }

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
                            onClick={pauseHandler} 
                            className={styles.button}
                            disabled={disabled}
                            aria-label="pause"
                        >
                            <IconPlayerPause size={24} stroke={2} />
                        </button>
                    ) : (
                        <button 
                            onClick={resumeHandler} 
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
