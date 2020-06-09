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
