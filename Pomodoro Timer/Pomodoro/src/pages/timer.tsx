import React, { useEffect, useState } from 'react'

function Timer() {
    const [secondsLeft, setSecondsLeft] = useState(60*25);
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState(60*25);
    const [timerName, setTimerName] = useState('Select Time');

    useEffect(()=>{
        let interval = null;

        if (isRunning && secondsLeft >0) {
            interval = setInterval(()=>{
                setSecondsLeft(secondsLeft=> secondsLeft -1);
            }, 1000);
        } else if( !isRunning && secondsLeft !==0){
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, secondsLeft]);

    const handleTimeChange = (event) => {
        const newTime = parseInt(event.target.value, 10);
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        setInitialTime(newTime);
        setSecondsLeft(newTime);
        setTimerName(selectedOptionText)
      };

    const startTimer =() =>{
        setIsRunning(true);
    };

    const pauseTimer = () =>{
        setIsRunning(false);
    };

    const resetTimer = () =>{
        setIsRunning(false);
        setSecondsLeft(initialTime);
    }

    return (
    <div>
        <h2> {timerName}: {Math.floor(secondsLeft/60)}:{secondsLeft%60} Minutes </h2>
        <select onChange={handleTimeChange} disabled={isRunning}>
            <option value="0">Select Time</option>
            <option value="900" onClick={resetTimer}> Long Break </option>
            <option value="300" onClick={resetTimer}>Short Break</option>
            <option value="1500" onClick={resetTimer}>Pomodoro</option>
        </select>
        <button onClick={startTimer} disabled= {isRunning || secondsLeft ===0} >Start</button>
        <button onClick={pauseTimer} disabled= {!isRunning}>Pause</button>
        <button onClick={resetTimer} >Reset</button>
    </div>
  );
}

export default Timer