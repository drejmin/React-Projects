import { Button } from '@/components/ui/button';
import * as Select from '@radix-ui/react-select';
import { useEffect, useRef, useState } from 'react';
import '../../public/Relaxing Alarm tone stress free.mp3';
import { MovingBackground } from '@/components/ui/MovingBackground';


const Timer=() => {
  const [secondsLeft, setSecondsLeft] = useState(60 * 25);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(60 * 25);
  const [timerName, setTimerName] = useState('Pomodoro');
  const [alarmPlayed, setAlarmPlayed] = useState(false);

  const alarmSound = useRef(new Audio('../../public/Relaxing Alarm tone stress free.mp3'))

  
  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft === 0) {
        if (!alarmPlayed) {
            alarmSound.current.play().catch(console.error);
            setAlarmPlayed(true);
        }
    } else {
        const intervalId = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }
}, [isRunning, secondsLeft, alarmPlayed]);



  const handleValueChange = (value: string) => {
    const newTime = parseInt(value, 10);
    setInitialTime(newTime);
    setSecondsLeft(newTime);
    setIsRunning(false);
    setAlarmPlayed(false);

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

  const handleStopMusic = () =>{
    if (alarmSound.current) {
        alarmSound.current.pause(); // Stop the audio playback
        alarmSound.current.currentTime = 0; // Reset audio position to start
      }
      setAlarmPlayed(false); // Reset alarm played state
    };
  

  return (
    <main>
      <MovingBackground/>
      <div  className='common-container flex flex-1 justify-center items-center flex-col mt-10 py-10'>
        <h2 className='h1-bold md: title-bold text-center w-full'>{timerName}: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</h2>
        <div className='common-container'>
          <Select.Root onValueChange={handleValueChange} >
              <Select.Trigger className=' flex flex-col h3-bold md: h2-bold text-center' aria-label="Time intervals" >
              <Select.Value placeholder='Select a Interval'>{timerName}▾</Select.Value>
              </Select.Trigger>
              <Select.Content>
              <Select.Viewport className='flex flex-col h3-bold md: h2-bold text-center'>
                  <Select.Item className='mt-8' value="1500">Pomodoro</Select.Item>
                  <Select.Item className='mt-1.5' value="300">Short Break</Select.Item>
                  <Select.Item className='mt-1.5' value="900">Long Break</Select.Item>
              </Select.Viewport>
              </Select.Content>
          </Select.Root>
        </div>
        <div className='flex flex-row padding:2 mt-4 whitespace-nowrap'>
        <Button className='h3-bold' onClick={() => setIsRunning(true)} disabled={isRunning || secondsLeft === 0}>Start</Button>
        <Button className='h3-bold' onClick={() => setIsRunning(false)} disabled={!isRunning}>Pause</Button>
        <Button className='h3-bold' onClick={() => { handleStopMusic(); setSecondsLeft(initialTime); setIsRunning(false); setAlarmPlayed(false)}}>Reset</Button>
        </div>
      </div>
    </main>
  );
}
export default Timer;
