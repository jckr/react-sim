import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';
import { initDataCircle } from './mazeCircle';
import { initDataHex } from './mazeHex';
import { initDataSquare } from './mazeSquare';
import { initDataTriangle } from './mazeTriangle';

export type MazeGridKind = 'square' | 'hexagonal' | 'triangular' | 'circle';

export type MazeParams = {
  drawItem: boolean;
  useColor: boolean;
  width: number;
  height: number;
  grid: MazeGridKind;
  cellSize: number;
  wallColor: string;
  pathColor: string;
  ticksPerAnimation: number;
};

export type MazeData = {
  grid: MazeGridKind;
  cells: Record<string, { neighbors: string[] }>;
  links: [string, string][];
  visited: Set<string>;
  stack: string[];
  cellSize: number;
  pathSize: number;
  wallSize: number;
  rows?: number;
  cols?: number;
};

export type MazeRenderState = MazeData;

function initData(params: MazeParams, _context?: unknown): MazeData {
  const random = Math.random;
  const { height, width, grid } = params;
  if (grid === 'circle') {
    const c = initDataCircle({ height, width }, random);
    return { grid, ...c };
  }
  if (grid === 'square') {
    const s = initDataSquare({ height, width });
    return { grid, ...s };
  }
  if (grid === 'hexagonal') {
    const h = initDataHex({ height, width });
    return { grid, ...h };
  }
  const t = initDataTriangle({ height, width });
  return { grid, ...t };
}

export function updateMaze(args: {
  data: MazeData;
  params: MazeParams;
  tick: number;
  cachedData: Record<number, MazeData>;
}): UpdateResult<MazeData> {
  const { data } = args;
  const random = Math.random;
  const { cells, links, stack, visited, ...rest } = data;

  if (visited.size === Object.values(cells).length || stack.length === 0) {
    return { status: 'complete', data };
  }

  const stackCopy = [...stack];
  let currentCell: string | undefined;
  let options: string[] = [];

  while (options.length === 0 && stackCopy.length > 0) {
    currentCell = stackCopy.pop();
    if (!currentCell) break;
    const cell = cells[currentCell];
    if (!cell) break;
    options = cell.neighbors.filter((d) => !visited.has(d));
  }

  if (!currentCell || options.length === 0) {
    return { status: 'complete', data };
  }

  const nextMove = options[Math.floor(random() * options.length)]!;
  const nextVisited = new Set(visited);
  nextVisited.add(nextMove);
  const nextLinks: [string, string][] = [...links, [currentCell, nextMove]];
  const nextStack = [...stackCopy, currentCell, nextMove];

  return {
    status: 'continue',
    data: {
      ...rest,
      grid: data.grid,
      cells,
      links: nextLinks,
      visited: nextVisited,
      stack: nextStack
    }
  };
}

export const module: SimulationModule<MazeData, MazeParams, MazeRenderState, unknown> = {
  initData,
  updateData: updateMaze,
  selectRenderState: (s) => ({ ...s.data }),
  defaultParams: {
    drawItem: true,
    useColor: false,
    width: 332,
    height: 332,
    grid: 'square',
    cellSize: 10,
    wallColor: '#000',
    pathColor: '#fff',
    ticksPerAnimation: 20
  }
};
