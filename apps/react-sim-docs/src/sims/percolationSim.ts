import { defineSim } from 'react-sim-engine/sim';

/**
 * Cell states:
 *  0 = EMPTY (open/porous)
 *  1 = ROCK (blocked)
 *  2 = WATER (filled by liquid from above)
 *  3 = WATER_FROM_LEFT (filled by liquid from the left)
 *  4 = WATER_FROM_RIGHT (filled by liquid from the right)
 */
const EMPTY = 0;
const ROCK = 1;
const WATER_FROM_TOP = 2;
const WATER_FROM_LEFT = 3;
const WATER_FROM_RIGHT = 4;

export type PercolationParams = {
  height: number;
  width: number;
  porosity: number;
};

export type PercolationData = {
  grid: number[][];
  queue: { x: number; y: number }[];
  result: 'pending' | 'success' | 'failure';
};

export { EMPTY, ROCK, WATER_FROM_TOP, WATER_FROM_LEFT, WATER_FROM_RIGHT };

export default defineSim<PercolationData, PercolationParams>({
  defaultParams: { height: 60, width: 60, porosity: 0.6 },

  init: ({ height, width, porosity }) => {
    const grid: number[][] = [];
    const queue: { x: number; y: number }[] = [];

    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width; x++) {
        row.push(Math.random() > porosity ? ROCK : EMPTY);
      }
      grid.push(row);
    }

    // Top row: every open cell gets water and enters the queue
    for (let x = 0; x < width; x++) {
      if (grid[0][x] === EMPTY) {
        grid[0][x] = WATER_FROM_TOP;
        queue.push({ x, y: 0 });
      }
    }

    return { grid, queue, result: 'pending' };
  },

  step: ({ data }) => {
    const { grid, queue } = data;
    let result = data.result;

    if (result !== 'pending') {
      return data;
    }

    if (queue.length === 0) {
      return { grid, queue: [], result: 'failure' as const };
    }

    const height = grid.length;
    const nextQueue: { x: number; y: number }[] = [];

    for (const cell of queue) {
      const { x, y } = cell;

      if (y === height - 1) {
        result = 'success';
      }

      // Down
      if (y + 1 < height && grid[y + 1][x] === EMPTY) {
        grid[y + 1][x] = WATER_FROM_TOP;
        nextQueue.push({ x, y: y + 1 });
      }

      // Left
      if (x - 1 >= 0 && grid[y][x - 1] === EMPTY) {
        grid[y][x - 1] = WATER_FROM_RIGHT;
        nextQueue.push({ x: x - 1, y });
      }

      // Right
      if (x + 1 < grid[0].length && grid[y][x + 1] === EMPTY) {
        grid[y][x + 1] = WATER_FROM_LEFT;
        nextQueue.push({ x: x + 1, y });
      }
    }

    if (nextQueue.length === 0 && result === 'pending') {
      result = 'failure';
    }

    return { grid, queue: nextQueue, result };
  },

  shouldStop: (data) => data.result !== 'pending',
});
