import { getColRow, makeDrawLink } from './mazeGeomHelpers';

export type SquareCell = {
  id: string;
  col: number;
  row: number;
  neighbors: string[];
};

export function getNeighborsSquare(id: number, cols: number, rows: number): number[] {
  const { col, row } = getColRow(id, cols);
  const neighbors: number[] = [];
  if (col) neighbors.push(id - 1);
  if (col < cols - 1) neighbors.push(id + 1);
  if (row) neighbors.push(id - cols);
  if (row < rows - 1) neighbors.push(id + cols);
  return neighbors;
}

export function initDataSquare(args: { height: number; width: number }): {
  cellSize: number;
  pathSize: number;
  wallSize: number;
  rows: number;
  cols: number;
  cells: Record<string, SquareCell>;
  links: [string, string][];
  visited: Set<string>;
  stack: string[];
} {
  const { height, width } = args;
  const cellSize = Math.max(5, Math.min(10, Math.min(height, width) / 20));
  const pathSize = 0.8 * cellSize;
  const wallSize = 0.2 * cellSize;
  const rows = Math.floor(height / cellSize);
  const cols = Math.floor(width / cellSize);
  const nbCells = rows * cols;

  const cells: Record<string, SquareCell> = {};
  for (let id = 0; id < nbCells; id++) {
    const key = String(id);
    cells[key] = {
      id: key,
      ...getColRow(id, cols),
      neighbors: getNeighborsSquare(id, cols, rows).map(String)
    };
  }

  return {
    cellSize,
    wallSize,
    pathSize,
    rows,
    cols,
    cells,
    links: [],
    visited: new Set(['0']),
    stack: ['0']
  };
}

export function getCoordsSquare(args: { cell: { col: number; row: number }; cellSize: number; wallSize: number }): [number, number] {
  const { cell, cellSize, wallSize } = args;
  const { col, row } = cell;
  return [wallSize / 2 + (col + 0.5) * cellSize, wallSize / 2 + (row + 0.5) * cellSize];
}

export function drawItemSquare(args: {
  cell: SquareCell;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  wallColor: string;
  wallSize: number;
}): void {
  const { cell, ctx, cellSize, wallColor, wallSize } = args;
  const center = getCoordsSquare({ cell, cellSize, wallSize });
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  ctx.strokeRect(center[0] - 0.5 * cellSize, center[1] - 0.5 * cellSize, cellSize, cellSize);
}

export const drawLinkSquare = makeDrawLink(getCoordsSquare);
