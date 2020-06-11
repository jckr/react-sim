import activators from '../../images/gifs/activators.gif';
import automata from '../../images/gifs/automata.gif';
import boids from '../../images/gifs/boids.gif';
import chaosGame from '../../images/gifs/chaos-game.gif';
import dice from '../../images/gifs/dice.gif';
import epidemic from '../../images/gifs/epidemic.gif';
import fibonacci from '../../images/gifs/fibonacci.gif';
import gameOfLife from '../../images/gifs/game-of-life.gif';
import maze from '../../images/gifs/maze.gif';
import percolation from '../../images/gifs/percolation.gif';
import segregation from '../../images/gifs/segregation.gif';
import simpleModel from '../../images/gifs/simple-model.gif';
import snake from '../../images/gifs/snake.gif';

export { default as Automata } from './automata';
export { default as Activators } from './activators';
export { default as Boids, ChillBoids } from './boids';
export { default as ChaosGame, BasicChaosGame } from './chaos-game';
export { default as Dice } from './dice';
export { default as Epidemic } from './epidemic';
export { default as Fibonacci, FibonacciNumbers } from './fibonacci';
export { default as GameOfLife } from './game-of-life';
export { default as Maze } from './mazes';
export { default as Percolation, PercolationGrid } from './percolation';
export { default as Segregation } from './segregation';
export { default as SimpleModel } from './simple-model';
export { default as Snake, SnakeGrid } from './snake';

export const gifs = {
  activators,
  automata,
  boids,
  'chaos-game': chaosGame,
  dice,
  epidemic,
  fibonacci,
  'game-of-life': gameOfLife,
  mazes: maze,
  percolation,
  segregation,
  'simple-model': simpleModel,
  snake,
};

const examples = {
  automata: '1D automata',
  activators: 'Activators/Inhibitors',
  boids: 'Boids',
  'chaos-game': 'Chaos Game',
  dice: 'Dice Simulator',
  epidemic: 'Epidemic Simulator',
  fibonacci: 'Fibonacci Spiral',
  'game-of-life': 'Game of Life',
  mazes: 'Maze generation',
  percolation: 'Percolation',
  segregation: 'Segregation',
  'simple-model': 'Simple Model',
  snake: 'Snake Game',
};

export default examples;
