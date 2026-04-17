import { defineSim } from 'react-sim-engine/sim';

export type GameOfLifeParams = { height: number; width: number; density: number };
export type GameOfLifeData = { grid: number[][]; changes: number };

function countNeighbors(x: number, y: number, grid: number[][]): number {
  const height = grid.length;
  if (!height) return 0;
  const width = grid[0].length;
  let n = 0;
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const x1 = x + xOffset;
      const y1 = y + yOffset;
      if (x1 < width && x1 > 0 && y1 < height && y1 > 0 && (x1 !== x || y1 !== y)) {
        n += grid[y1][x1];
      }
    }
  }
  return n;
}

export default defineSim<GameOfLifeData, GameOfLifeParams>({
  defaultParams: { height: 28, width: 28, density: 0.15 },

  init: ({ height, width, density }) => ({
    grid: Array.from({ length: height }, () =>
      Array.from({ length: width }, () => (Math.random() < density ? 1 : 0))
    ),
    changes: -1,
  }),

  step: ({ data }) => {
    let changes = 0;
    const grid = data.grid.map((row, y) =>
      row.map((cell, x) => {
        const neighbors = countNeighbors(x, y, data.grid);
        if (cell && (neighbors < 2 || neighbors > 3)) {
          changes++;
          return 0;
        }
        if (!cell && neighbors === 3) {
          changes++;
          return 1;
        }
        return cell;
      })
    );
    return { grid, changes };
  },

  shouldStop: (data) => data.changes === 0,
});
