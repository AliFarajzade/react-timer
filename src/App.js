import React, { useRef, useState } from 'react';
import './App.css';

const padTime = timeToPad => timeToPad.toString().padStart(2, '0');

export default function App() {
    const [time, setTime] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [statement, setStatement] = useState('Let the counter begin!');

    const timerIntervalRef = useRef(null);

    const startTimer = () => {
        if (timerIntervalRef.current) return;
        setStatement('You are doing great.');
        setIsRunning(true);
        timerIntervalRef.current = setInterval(
            () =>
                setTime(prevState => {
                    if (prevState >= 1) return prevState - 1;
                    else {
                        clearInterval(timerIntervalRef.current);
                        return 0;
                    }
                }),
            1000
        );
    };

    const stopTimer = () => {
        if (!timerIntervalRef.current) return;
        setStatement('Keep it up.');
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setIsRunning(false);
    };

    const resetTimer = () => {
        clearInterval(timerIntervalRef.current);
        setStatement('Let the counter begin!');
        timerIntervalRef.current = null;
        setTime(25 * 60);
        setIsRunning(false);
    };

    const minutes = padTime(Math.floor(time / 60));
    const seconds = padTime(time % 60);

    return (
        <div className="app">
            <h2>{statement}</h2>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {!isRunning && <button onClick={startTimer}>Start</button>}
                {isRunning && <button onClick={stopTimer}>Stop</button>}
                <button onClick={resetTimer}>Reset</button>
            </div>
            <a
                className="attribution"
                target="_blank"
                href="https://github.com/alifarajzade"
            >
                Built by Ali Farajzade 2022&copy;
            </a>
        </div>
    );
}
