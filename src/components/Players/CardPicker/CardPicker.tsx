import { Card, CardContent, Grid, Grow, Slide, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { updatePlayerValue } from '../../../service/players';
import { Game } from '../../../types/game';
import { Player } from '../../../types/player';
import { Status } from '../../../types/status';
import { CardConfig, getCards, getRandomEmoji } from './CardConfigs';
import './CardPicker.css';

interface CardPickerProps {
  game: Game;
  players: Player[];
  currentPlayerId: string;
}
export const CardPicker: React.FC<CardPickerProps> = ({ game, players, currentPlayerId }) => {
  const [randomEmoji, setRandomEmoji] = useState(getRandomEmoji);
  const playPlayer = (gameId: string, playerId: string, card: CardConfig) => {
    if (game.gameStatus !== Status.Finished) {
      updatePlayerValue(gameId, playerId, card.value, randomEmoji);
    }
  };
  const cards = getCards(game.gameType);

  useEffect(() => {
    if (game.gameStatus === Status.Started) {
      setRandomEmoji(getRandomEmoji);
    }
  }, [game.gameStatus]);
  return (
    <Grow in={true} timeout={1000}>
      <div>
        <Typography variant='h6'>
            {game.gameStatus !== Status.Finished
              ? 'Pick your card!'
              : 'Estimation completed. Waiting for moderator to start a new voting...'}
        </Typography>
        <div className='CardPickerContainer'>
          <Grid container spacing={4} justifyContent='center'>
            {cards.map((card: CardConfig, index) => (
              <Grid key={card.value} item xs>
                <Slide in={true} direction={'down'} timeout={(1000 * index) / 2}>
                  <Card
                    id={`card-${card.displayValue}`}
                    className='CardPicker'
                    variant='outlined'
                    onClick={() => playPlayer(game.id, currentPlayerId, card)}
                    style={{
                      ...getCardStyle(players, currentPlayerId, card),
                      pointerEvents: getPointerEvent(game),
                    }}
                  >
                    <CardContent className='CardContent'>
                      {card.value >= 0 && (
                        <>
                          <Typography className='CardContentTop' variant='caption'>
                            {card.displayValue}
                          </Typography>
                          <Typography className='CardContentMiddle' variant='h4'>
                            {card.displayValue}
                          </Typography>
                          <Typography className='CardContentBottom' variant='caption'>
                            {card.displayValue}
                          </Typography>
                        </>
                      )}
                      {card.value === -1 && (
                        <Typography className='CardContentMiddle' variant='h3'>
                          {randomEmoji}
                        </Typography>
                      )}
                      {card.value === -2 && (
                        <Typography className='CardContentMiddle' variant='h3'>
                          ❓
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Grow>
  );
};

const getCardStyle = (players: Player[], playerId: string, card: CardConfig) => {
  const player = players.find((player) => player.id === playerId);
  if (player && player.value !== undefined && player.value === card.value) {
    return {
      marginTop: '-15px',
      zIndex: 5,
      backgroundColor: card.color,
      border: '3.5px solid rgba(0, 51, 102, 0.9)',
      boxShadow: '0 0px 20px 0 grey',
    };
  }
  return { backgroundColor: card.color };
};

const getPointerEvent = (game: Game) => {
  if (game.gameStatus === Status.Finished) {
    return 'none';
  }
  return 'inherit';
};
