import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';
import {
  addToGrid,
  getActionGrid,
  getLongestPath,
  getRandomInBounds,
  getShortestPath,
  opposite,
  positionFruit,
  v
} from './snakeHelpers';

export type SnakeParams = {
  cellSize: number;
  delay: number;
  displayCircuit: boolean;
  displayGrid: boolean;
  displayHead: boolean;
  fruitGrowth: number;
  height: number;
  width: number;
  initialLength: number;
  safeMode: boolean;
  speed: string;
  snakePosRandom: boolean;
  directionRandom: boolean;
  xHead: number;
  yHead: number;
  directionText: 'up' | 'right' | 'down' | 'left';
};

export type SnakeData = {
  actionGrid: (number | undefined)[][];
  bestPath: boolean;
  direction: number;
  fruit: [number, number] | null;
  grid: number[][];
  head: [number, number];
  length: number;
  snakePath: [number, number][];
};

export type SnakeRenderState = SnakeData;

function initSnake(
  params: Pick<
    SnakeParams,
    | 'directionRandom'
    | 'directionText'
    | 'height'
    | 'width'
    | 'initialLength'
    | 'snakePosRandom'
    | 'xHead'
    | 'yHead'
  >,
  random: () => number
): {
  grid: number[][];
  head: [number, number];
  tail: [number, number];
  direction: number;
  length: number;
  snakePath: [number, number][];
} {
  const { directionRandom, directionText, height, width, initialLength, snakePosRandom, xHead, yHead } = params;

  const direction = directionRandom
    ? Math.floor(random() * 4)
    : ({ up: 0, right: 1, down: 2, left: 3 } as const)[directionText];

  const minX = direction === 1 ? initialLength + 2 : 2;
  const maxX = width - 1 - (direction === 3 ? initialLength + 2 : 2);
  const minY = direction === 2 ? initialLength + 2 : 2;
  const maxY = height - 1 - (direction === 0 ? initialLength + 2 : 2);

  let xh = xHead;
  let yh = yHead;
  if (snakePosRandom) {
    xh = getRandomInBounds(minX, maxX, random);
    yh = getRandomInBounds(minY, maxY, random);
  } else {
    xh = Math.min(maxX, Math.max(minX, xh));
    yh = Math.min(maxY, Math.max(minY, yh));
  }

  const grid: number[][] = [];
  for (let i = 0; i < height; i++) {
    grid.push(Array.from({ length: width }, () => 0));
  }

  const head: [number, number] = [xh, yh];
  const snakePath: [number, number][] = [];
  let tail: [number, number] = [xh, yh];

  const opp = opposite[direction] as 0 | 1 | 2 | 3;
  for (let s = 0; s < initialLength; s++) {
    const x = xh + s * v[opp][0];
    const y = yh + s * v[opp][1];
    grid[y]![x] = s + 1;
    snakePath.unshift([x, y]);
    tail = [x, y];
  }

  return {
    grid,
    head,
    tail,
    direction,
    length: initialLength,
    snakePath
  };
}

export function initSnakeGame(params: SnakeParams, _context?: unknown): SnakeData {
  const random = Math.random;
  const { grid, head, tail, direction, length, snakePath } = initSnake(params, random);
  const fruit = positionFruit(grid, random);
  const longestPath = getLongestPath({
    grid,
    start: head,
    end: tail
  });
  const actionGrid = getActionGrid({ grid, path: longestPath, direction });
  return {
    head,
    grid,
    direction,
    actionGrid,
    fruit,
    length,
    snakePath,
    bestPath: false
  };
}

export function updateSnake(args: {
  data: SnakeData;
  params: SnakeParams;
  tick: number;
  cachedData: Record<number, SnakeData>;
}): UpdateResult<SnakeData> {
  const { data, params } = args;
  const random = Math.random;
  const { actionGrid, bestPath, grid, direction, head, fruit, length } = data;
  let updatedActionGrid = actionGrid;
  let updatedBestPath = bestPath;
  const { fruitGrowth, height, width, safeMode } = params;

  const snakePathWork: ([number, number] | undefined)[] = [];
  const updatedGrid = grid.map((row, r) =>
    row.map((cell, c) => {
      if (cell === 0 || cell + 1 > length) {
        return 0;
      }
      snakePathWork[length - cell - 1] = [c, r];
      return cell + 1;
    })
  );
  while (snakePathWork[0] === undefined) {
    snakePathWork.shift();
  }
  const tail = snakePathWork[0] as [number, number];
  const updatedHead: [number, number] = [head[0] + v[direction][0], head[1] + v[direction][1]];

  if (
    updatedGrid[updatedHead[1]]![updatedHead[0]] !== 0 ||
    updatedHead[0] >= width ||
    updatedHead[0] < 0 ||
    updatedHead[1] >= height ||
    updatedHead[1] < 0
  ) {
    return { status: 'complete', data };
  }

  updatedGrid[updatedHead[1]]![updatedHead[0]] = 1;

  if (updatedGrid.every((row) => row.every((cell) => cell))) {
    return {
      status: 'complete',
      data: {
        actionGrid: updatedActionGrid,
        bestPath: updatedBestPath,
        direction,
        fruit,
        grid: updatedGrid,
        head: updatedHead,
        length,
        snakePath: [...(snakePathWork as [number, number][]), updatedHead]
      }
    };
  }

  let updatedLength = length;
  let updatedFruit: [number, number] | null = fruit ? [fruit[0], fruit[1]] : [-1, -1];
  if (updatedHead[0] === updatedFruit[0] && updatedHead[1] === updatedFruit[1]) {
    updatedLength = Math.min(height * width, updatedLength + fruitGrowth);
    if (!safeMode) {
      updatedBestPath = false;
    }
    updatedFruit = positionFruit(updatedGrid, random);
  }

  if (updatedBestPath === false && updatedFruit) {
    const pathToFruit = getShortestPath({
      grid,
      start: updatedHead,
      end: updatedFruit
    });
    if (pathToFruit) {
      const tailToFruit = [...(snakePathWork as [number, number][]), ...pathToFruit];
      const candidateGrid = addToGrid(updatedGrid, tailToFruit);
      const backToTail = getLongestPath({
        grid: candidateGrid,
        start: updatedFruit,
        end: tail
      });
      const circuitLength = new Set([...tailToFruit, ...backToTail].map((d) => d.join())).size;
      if (circuitLength === height * width) {
        updatedActionGrid = getActionGrid({
          grid,
          path: tailToFruit,
          stack: backToTail
        });
        updatedBestPath = true;
      }
    }
  }

  const updatedDirection = updatedActionGrid[updatedHead[1]]![updatedHead[0]] ?? direction;
  const nextSnakePath = [...(snakePathWork as [number, number][]), updatedHead];

  return {
    status: 'continue',
    data: {
      actionGrid: updatedActionGrid,
      bestPath: updatedBestPath,
      direction: updatedDirection,
      fruit: updatedFruit,
      grid: updatedGrid,
      head: updatedHead,
      length: updatedLength,
      snakePath: nextSnakePath
    }
  };
}

export const module: SimulationModule<SnakeData, SnakeParams, SnakeRenderState, unknown> = {
  initData: initSnakeGame,
  updateData: updateSnake,
  selectRenderState: (s) => ({ ...s.data }),
  defaultParams: {
    cellSize: 16,
    delay: 100,
    displayCircuit: true,
    displayGrid: false,
    displayHead: true,
    fruitGrowth: 4,
    height: 20,
    width: 20,
    initialLength: 2,
    safeMode: false,
    speed: 'normal',
    snakePosRandom: true,
    directionRandom: true,
    xHead: 10,
    yHead: 10,
    directionText: 'right'
  }
};
