import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { blue } from '@material-ui/core/colors';
import './CountdownTimer.css';

interface CountdownTimerButtonProps {
  isModerator: boolean;
  initialDuration: number;
  onTimerStart: () => void;
  onClick: () => void;
}

export const CountdownTimerButton: React.FC<CountdownTimerButtonProps> = ({ onTimerStart, onClick }) => {
  const handleClick = () => {
    onClick();
    onTimerStart();
  };

  return (
    <div className='CountdownTimerButton'>
      <div className='GameControllerButtonContainer'>
        <div className='GameControllerButton'>
          <IconButton data-testid='timer-button' onClick={handleClick}>
            <TimerIcon fontSize='large' style={{ color: blue[500] }} />
          </IconButton>
        </div>
        <Typography variant='caption'>Timer</Typography>
      </div>
    </div>
  );
};
