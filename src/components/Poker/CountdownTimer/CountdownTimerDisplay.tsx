import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './CountdownTimer.css';
import { subscribeToTimerState } from '../../../service/games';
import { TimerState } from '../../../types/timer';

interface CountdownTimerDisplayProps {
  gameId: string;
  initialDuration: number;
  timerKey: number;
  isPlaying: boolean;
}

export const CountdownTimerDisplay: React.FC<CountdownTimerDisplayProps> = ({ gameId, initialDuration, timerKey, isPlaying }) => {
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTimerState(gameId, (timerState: TimerState) => {
      if (timerState.isRunning) {
        const endTime = new Date(timerState.endTime).getTime();
        const now = new Date().getTime();
        const timeDiff = Math.max(0, (endTime - now) / 1000); // Convert milliseconds to seconds
        setRemainingTime(timeDiff);
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  useEffect(() => {
    if (remainingTime === 0) {
      setShowPopup(true);
      const bellSound = new Audio('/sounds/bell.mp3');
      bellSound.play(); // Play the bell sound
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  }, [remainingTime]);

  return (
    <div className='CountdownTimerDisplay'>
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={initialDuration}
        size={60}
        strokeWidth={6}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => setRemainingTime(0)}
      >
        {({ remainingTime }) => (
          <Typography variant='caption'>
            {remainingTime}
          </Typography>
        )}
      </CountdownCircleTimer>
      {showPopup && (
        <div className='TimeOverPopup'>
          <Typography variant='body2'>Time is over!</Typography>
        </div>
      )}
    </div>
  );
};
