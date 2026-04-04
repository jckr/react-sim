import { HALF_SQRT3, getColRow, makeDrawLink } from './mazeGeomHelpers';

export type TriangleCell = {
  id: string;
  col: number;
  row: number;
  neighbors: string[];
};

export function getNeighborsTriangle(id: number, cols: number, rows: number): number[] {
  const { col, row } = getColRow(id, cols);
  const neighbors: number[] = [];
  if (col) neighbors.push(id - 1);
  if (col < cols - 1) neighbors.push(id + 1);
  if ((col + row) % 2) {
    if (row) neighbors.push(id - cols);
  } else if (row < rows - 1) {
    neighbors.push(id + cols);
  }
  return neighbors;
}

export function initDataTriangle(args: { height: number; width: number }): {
  cellSize: number;
  pathSize: number;
  wallSize: number;
  rows: number;
  cols: number;
  cells: Record<string, TriangleCell>;
  links: [string, string][];
  visited: Set<string>;
  stack: string[];
} {
  const { height, width } = args;
  const cellSize = Math.max(10, Math.min(10, Math.min(height, width) / 20));
  const pathSize = 0.5 * cellSize;
  const wallSize = 0.2 * cellSize;
  const rows = Math.floor(height / (cellSize * HALF_SQRT3));
  const cols = Math.floor((2 * width) / cellSize) - 1;
  const nbCells = rows * cols;

  const cells: Record<string, TriangleCell> = {};
  for (let id = 0; id < nbCells; id++) {
    const key = String(id);
    cells[key] = {
      id: key,
      ...getColRow(id, cols),
      neighbors: getNeighborsTriangle(id, cols, rows).map(String)
    };
  }

  return {
    cellSize,
    pathSize,
    wallSize,
    rows,
    cols,
    cells,
    links: [],
    visited: new Set(['0']),
    stack: ['0']
  };
}

export function getCoordsTriangle(args: { cell: { col: number; row: number }; cellSize: number; wallSize: number }): [number, number] {
  const { cell, cellSize, wallSize } = args;
  const { col, row } = cell;
  return [
    wallSize / 2 + ((col + 1) * cellSize) / 2,
    wallSize / 2 + (row + ((row + col) % 2 ? 1 / 3 : 2 / 3)) * HALF_SQRT3 * cellSize
  ];
}

export function drawItemTriangle(args: {
  cell: TriangleCell;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  wallColor: string;
  wallSize: number;
}): void {
  const { cell, ctx, cellSize, wallColor, wallSize } = args;
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  const { col, row } = cell;
  const isPointingDown = (col + row) % 2;
  ctx.beginPath();
  if (isPointingDown) {
    ctx.moveTo(wallSize / 2 + (col * cellSize) / 2, wallSize / 2 + row * cellSize * HALF_SQRT3);
    ctx.lineTo(wallSize / 2 + ((col + 2) * cellSize) / 2, wallSize / 2 + row * cellSize * HALF_SQRT3);
    ctx.lineTo(wallSize / 2 + ((col + 1) * cellSize) / 2, wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3);
  } else {
    ctx.moveTo(wallSize / 2 + (col * cellSize) / 2, wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3);
    ctx.lineTo(wallSize / 2 + ((col + 2) * cellSize) / 2, wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3);
    ctx.lineTo(wallSize / 2 + ((col + 1) * cellSize) / 2, wallSize / 2 + row * cellSize * HALF_SQRT3);
  }
  ctx.closePath();
  ctx.stroke();
}

export const drawLinkTriangle = makeDrawLink(getCoordsTriangle);
