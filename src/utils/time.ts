export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

interface TimeToSeconds {
    hours: number;
    minutes: number;
    seconds: number;
}

export const timeToSeconds = ({ hours, minutes, seconds }: TimeToSeconds): number => {
    return (hours * 3600) + (minutes * 60) + +seconds;
};
