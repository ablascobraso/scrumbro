import { Status } from './status';
import { TimerState } from './timer';

export interface Game {
  id: string;
  name: string;
  average: number;
  gameStatus: Status;
  gameType?: GameType | GameType.Fibonacci;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
  timerState?: TimerState; // Add the timerState field
}

export interface NewGame {
  name: string;
  gameType: string;
  createdBy: string;
  createdAt: Date;
}

export enum GameType {
  Fibonacci = 'Fibonacci',
  ShortFibonacci = 'ShortFibonacci',
  TShirt = 'TShirt',
}
