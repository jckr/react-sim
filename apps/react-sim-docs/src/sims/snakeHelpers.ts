/** Pathfinding + grid helpers for the AI snake (ported from legacy react-sim). */

export const UP = 0;
export const RIGHT = 1;
export const DOWN = 2;
export const LEFT = 3;

export const DIRECTIONS = [UP, RIGHT, DOWN, LEFT] as const;

export const opposite = [DOWN, LEFT, UP, RIGHT] as const;

export const v = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
] as const;

const DELTA_TO_DIR: Record<string, number> = {
  '0,-1': UP,
  '1,0': RIGHT,
  '0,1': DOWN,
  '-1,0': LEFT
};

export function directionFromDelta(dx: number, dy: number): number {
  return DELTA_TO_DIR[`${dx},${dy}`] ?? UP;
}

export function coordKey(x: number, y: number): string {
  return `${x},${y}`;
}

export function getRandomInBounds(min: number, max: number, random: () => number): number {
  return min + Math.floor(random() * (max + 1 - min));
}

export function isValid(x: number, y: number, visited: Record<string, boolean>, height: number, width: number): boolean {
  if (x < 0 || x > width - 1 || y < 0 || y > height - 1) return false;
  if (visited[coordKey(x, y)]) return false;
  return true;
}

export function initVisited(grid: number[][] = [[]], path: readonly (readonly [number, number])[] = []): Record<string, boolean> {
  const visited: Record<string, boolean> = {};
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell > 0) {
        visited[coordKey(c, r)] = true;
      }
    });
  });
  for (const p of path) {
    const [a, b] = p;
    visited[coordKey(a, b)] = true;
  }
  return visited;
}

export function getShortestPath(args: {
  grid: number[][];
  start: readonly [number, number];
  end: readonly [number, number];
}): [number, number][] | undefined {
  const { grid, start, end } = args;
  const height = grid.length;
  if (height === 0) return [];
  const width = grid[0]?.length ?? 0;

  const visited = initVisited(grid);
  delete visited[coordKey(end[0], end[1])];

  const paths: Record<string, [number, number][]> = {};
  const queue: [number, number][] = [];
  paths[coordKey(start[0], start[1])] = [[start[0], start[1]]];
  queue.push([start[0], start[1]]);
  let result: [number, number][] | undefined;

  while (queue.length > 0 && !result) {
    const node = queue.shift()!;
    const [nx, ny] = node;
    const nodeKey = coordKey(nx, ny);
    for (const d of DIRECTIONS) {
      const step: [number, number] = [nx + v[d][0], ny + v[d][1]];
      const [x, y] = step;
      if (!isValid(x, y, visited, height, width)) continue;
      visited[coordKey(x, y)] = true;
      const prevPath = paths[nodeKey];
      if (!prevPath) continue;
      paths[coordKey(x, y)] = [...prevPath, step];
      if (x === end[0] && y === end[1]) {
        result = paths[coordKey(x, y)];
        break;
      }
      queue.push(step);
    }
  }
  return result;
}

export function getLongestPath(args: { grid: number[][]; start: readonly [number, number]; end: readonly [number, number] }): [number, number][] {
  const { grid, start, end } = args;
  const height = grid.length;
  if (height === 0) return [];
  const width = grid[0]?.length ?? 0;

  let stack: [number, number][] = getShortestPath({ grid, start, end }) ?? [[start[0], start[1]]];
  let visited = initVisited(grid, stack);
  const head = stack.shift();
  let longestPath: [number, number][] = head ? [head] : [[start[0], start[1]]];

  while (stack.length > 0) {
    const updatedPath = extendPath({
      height,
      longestPath,
      stack,
      visited,
      width
    });
    stack = updatedPath.stack;
    visited = updatedPath.visited;
    longestPath = updatedPath.longestPath;
  }

  return longestPath;
}

export function extendPath(args: {
  height: number;
  longestPath: [number, number][];
  stack: [number, number][];
  visited: Record<string, boolean>;
  width: number;
}): {
  stack: [number, number][];
  visited: Record<string, boolean>;
  longestPath: [number, number][];
  considered: [[number, number], [number, number]];
} {
  const { height, longestPath, stack, visited, width } = args;
  const lastInLongestPath = longestPath[longestPath.length - 1]!;
  visited[coordKey(lastInLongestPath[0], lastInLongestPath[1])] = true;
  const nextInStack = stack.shift()!;

  const dx = nextInStack[0] - lastInLongestPath[0];
  const dy = nextInStack[1] - lastInLongestPath[1];

  const rightPoints: [[number, number], [number, number]] = [
    [lastInLongestPath[0] - dy, lastInLongestPath[1] - dx],
    [nextInStack[0] - dy, nextInStack[1] - dx]
  ];
  const leftPoints: [[number, number], [number, number]] = [
    [lastInLongestPath[0] + dy, lastInLongestPath[1] + dx],
    [nextInStack[0] + dy, nextInStack[1] + dx]
  ];

  if (
    isValid(rightPoints[0][0], rightPoints[0][1], visited, height, width) &&
    isValid(rightPoints[1][0], rightPoints[1][1], visited, height, width)
  ) {
    stack.unshift(nextInStack);
    stack.unshift(rightPoints[1]);
    stack.unshift(rightPoints[0]);
    visited[coordKey(rightPoints[0][0], rightPoints[0][1])] = true;
    visited[coordKey(rightPoints[1][0], rightPoints[1][1])] = true;
  } else if (
    isValid(leftPoints[0][0], leftPoints[0][1], visited, height, width) &&
    isValid(leftPoints[1][0], leftPoints[1][1], visited, height, width)
  ) {
    stack.unshift(nextInStack);
    stack.unshift(leftPoints[1]);
    stack.unshift(leftPoints[0]);
    visited[coordKey(leftPoints[0][0], leftPoints[0][1])] = true;
    visited[coordKey(leftPoints[1][0], leftPoints[1][1])] = true;
  } else {
    longestPath.push(nextInStack);
  }
  return {
    stack,
    visited,
    longestPath,
    considered: [lastInLongestPath, nextInStack]
  };
}

export function getActionGrid(args: {
  grid: number[][];
  path?: [number, number][];
  direction?: number;
  stack?: [number, number][];
}): (number | undefined)[][] {
  const { grid, path = [], direction, stack = [] } = args;
  const totalPath = [...path, ...stack];
  const actionGrid = grid.map((row) => row.map((cell) => (cell ? direction : undefined)));
  if (totalPath.length < 2) {
    return actionGrid;
  }
  let node: [number, number] | undefined;
  for (let i = 1; i < totalPath.length; i++) {
    const prev = totalPath[i - 1]!;
    node = totalPath[i]!;
    const dx = node[0] - prev[0];
    const dy = node[1] - prev[1];
    const [c, r] = prev;
    const row = actionGrid[r];
    if (row) row[c] = directionFromDelta(dx, dy);
  }
  if (direction !== undefined && node) {
    const [c, r] = node;
    const row = actionGrid[r];
    if (row) row[c] = direction;
  }
  return actionGrid;
}

export function positionFruit(grid: number[][], random: () => number): [number, number] | null {
  const eligible: [number, number][] = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) eligible.push([c, r]);
    });
  });
  if (eligible.length === 0) return null;
  const idx = Math.floor(random() * eligible.length);
  return eligible[idx] ?? null;
}

export function addToGrid(grid: number[][], path: readonly (readonly [number, number])[]): number[][] {
  const updatedGrid = grid.map((row) => row.map((cell) => cell));
  for (const [c, r] of path) {
    const row = updatedGrid[r];
    if (row) row[c] = 1;
  }
  return updatedGrid;
}
