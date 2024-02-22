import { Button } from '@/components/ui/button';
import * as Select from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import './timer.css'

function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(60 * 25);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(60 * 25);
  const [timerName, setTimerName] = useState('Pomodoro');

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    } else if (!isRunning && secondsLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const handleValueChange = (value) => {
    const newTime = parseInt(value, 10);
    setInitialTime(newTime);
    setSecondsLeft(newTime);
    setIsRunning(false); // Automatically pause timer on time change
    // Update the timer name based on the value
    switch (value) {
      case '1500':
        setTimerName('Pomodoro');
        break;
      case '300':
        setTimerName('Short Break');
        break;
      case '900':
        setTimerName('Long Break');
        break;
      default:
        setTimerName('Custom');
    }
  };

  return (
    <div  className='flex flex-1 justify-center items-center flex-col py-10'>
      <h2>{timerName}: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</h2>
      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger aria-label="Time intervals">
          <Select.Value placeholder='Select a Interval' >{timerName}</Select.Value>
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1500">Pomodoro</Select.Item>
            <Select.Item value="300">Short Break</Select.Item>
            <Select.Item value="900">Long Break</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
      <Button className="shad-button_primary whitespace-nowrap" variant="ghost" onClick={() => setIsRunning(true)} disabled={isRunning || secondsLeft === 0}>Start</Button>
      <Button className="shad-button_primary whitespace-nowrap" variant="ghost" onClick={() => setIsRunning(false)} disabled={!isRunning}>Pause</Button>
      <Button className="shad-button_primary whitespace-nowrap" variant="ghost" onClick={() => { setSecondsLeft(initialTime); setIsRunning(false); }}>Reset</Button>
    </div>
  );
}

export default Timer;
