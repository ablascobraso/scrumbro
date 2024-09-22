import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { CountdownTimerButton } from './CountdownTimerButton';
import { CountdownTimerDisplay } from './CountdownTimerDisplay';
import { isModerator } from '../../../utils/isModerator';
import { updateTimerState, subscribeToTimerState, initializeTimerState } from '../../../service/games';
import { TimerState } from '../../../types/timer';
import './CountdownTimer.css';

interface CountdownTimerProps {
  gameId: string;
  createdById: string;
  currentPlayerId: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ gameId, createdById, currentPlayerId }) => {
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); 
  const [initialDuration, setInitialDuration] = useState(60);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [customTime, setCustomTime] = useState<string>('1');
  const moderator = isModerator(createdById, currentPlayerId);

  useEffect(() => {
    initializeTimerState(gameId);

    const unsubscribe = subscribeToTimerState(gameId, (timerState: TimerState) => {
      if (timerState.isRunning) {
        const endTime = new Date(timerState.endTime).getTime();
        const now = new Date().getTime();
        const timeDiff = Math.max(0, (endTime - now) / 1000); // Convert milliseconds to seconds
        setRemainingTime(timeDiff);
        setInitialDuration(timeDiff); // Update initial duration based on timer state
        setTimerKey(prevKey => prevKey + 1);
        setIsTimerPlaying(true);
      } else {
        setIsTimerPlaying(false);
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  const handleTimerStart = (duration: number) => {
    if (moderator) {
      const endTime = new Date(new Date().getTime() + duration * 1000);
      updateTimerState(gameId, { isRunning: true, endTime: endTime.toISOString() });
    }
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCustomTime(value);
    }
  };

  const handleSetTime = () => {
    const timeInMinutes = parseInt(customTime, 10);
    if (!isNaN(timeInMinutes) && timeInMinutes > 0) {
      const durationInSeconds = timeInMinutes * 60;
      setInitialDuration(durationInSeconds);
      setRemainingTime(durationInSeconds);
      handleTimerStart(durationInSeconds); // Start the timer with the custom duration
    } else {
      setInitialDuration(60); // Default 1 minute if input is invalid
      setRemainingTime(60);
      handleTimerStart(60); // Start the timer with the default duration
    }
    setShowTimeInput(false);
  };

  return (
    <div className='CountdownTimer' data-testid="CountdownTimer">
      {moderator && (
        <>
          <CountdownTimerButton
            isModerator={moderator}
            initialDuration={initialDuration}
            onTimerStart={() => setShowTimeInput(!showTimeInput)}
            onClick={() => setShowTimeInput(!showTimeInput)}
          />
          {showTimeInput && (
            <div className='TimeInputPopup'>
              <TextField
                id="time-input-popup-id"
                label="Set time (in minutes)"
                variant="outlined"
                value={customTime}
                onChange={handleTimeInputChange}
                size="small"
                inputProps={{ maxLength: 3 }}
                style={{ width: '180px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetTime}
                size="small"
                style={{ marginLeft: '10px' }}
              >
                Start
              </Button>
            </div>
          )}
        </>
      )}
      <CountdownTimerDisplay
        gameId={gameId}
        initialDuration={initialDuration}
        timerKey={timerKey}
        isPlaying={isTimerPlaying}
      />
    </div>
  );
};

export default CountdownTimer;
