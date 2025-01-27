'use client';

import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { addSeconds } from 'date-fns';

type Props = {
    duration: number;
    onExpire?: () => void;
}

export function Timer({ duration, onExpire=() => undefined }: Props) {
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
        <div className="timer">
            {hours}:{minutes}:{seconds}
            <br />
            {isRunning 
                ? <button onClick={pause}>pause</button> 
                : <button onClick={resume}>resume</button>
            }
            <button onClick={() => {
                restart(addSeconds(new Date(), duration))
            }}>restart</button>
        </div>
    )
}
