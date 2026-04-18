import { defineSim } from 'react-sim-engine/sim';

export type ActivatorsParams = {
  height: number;
  width: number;
  density: number;
  innerRadius: number;
  outerRadius: number;
  w: number;
};

export type CellNeighbors = {
  inner: [number, number][];
  outer: [number, number][];
};

export type ActivatorsData = {
  grid: number[][];
  neighbors: CellNeighbors[][];
  changes: number;
};

function buildNeighborMap(
  height: number,
  width: number,
  innerRadius: number,
  outerRadius: number
): CellNeighbors[][] {
  const map: CellNeighbors[][] = [];
  for (let row = 0; row < height; row++) {
    const rowNeighbors: CellNeighbors[] = [];
    for (let col = 0; col < width; col++) {
      const inner: [number, number][] = [];
      const outer: [number, number][] = [];

      const x0 = Math.max(col - outerRadius, 0);
      const x1 = Math.min(col + outerRadius, width - 1);
      const y0 = Math.max(row - outerRadius, 0);
      const y1 = Math.min(row + outerRadius, height - 1);

      for (let x = x0; x <= x1; x++) {
        for (let y = y0; y <= y1; y++) {
          const dist = Math.hypot(col - x, row - y);
          if (dist > innerRadius && dist <= outerRadius) {
            outer.push([x, y]);
          } else if (dist > 0 && dist <= innerRadius) {
            inner.push([x, y]);
          }
        }
      }
      rowNeighbors.push({ inner, outer });
    }
    map.push(rowNeighbors);
  }
  return map;
}

export default defineSim<ActivatorsData, ActivatorsParams>({
  defaultParams: {
    height: 35,
    width: 35,
    density: 0.5,
    innerRadius: 3,
    outerRadius: 6,
    w: 0.35,
  },

  init: ({ height, width, density, innerRadius, outerRadius }) => {
    const grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => (Math.random() < density ? 1 : 0))
    );
    const neighbors = buildNeighborMap(height, width, innerRadius, outerRadius);
    return { grid, neighbors, changes: -1 };
  },

  step: ({ data, params }) => {
    const { grid, neighbors } = data;
    const { w } = params;
    const height = grid.length;
    const width = grid[0].length;
    let changes = 0;

    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => {
        const { inner, outer } = neighbors[r][c];

        let activators = 0;
        for (const [x, y] of inner) {
          activators += grid[y][x];
        }

        let inhibitors = 0;
        for (const [x, y] of outer) {
          inhibitors += grid[y][x];
        }

        const mutation = activators - w * inhibitors;

        let newValue = cell;
        if (mutation > 0) newValue = 1;
        if (mutation < 0) newValue = 0;

        if (newValue !== cell) changes++;
        return newValue;
      })
    );

    return { grid: newGrid, neighbors, changes };
  },

  shouldStop: (data) => {
    const { changes, grid } = data;
    if (changes < 0) return false;
    const total = grid.length * grid[0].length;
    return changes < 0.01 * total;
  },
});
