import { HALF_SQRT3, getColRow, makeDrawLink } from './mazeGeomHelpers';

export type HexCell = {
  id: string;
  col: number;
  row: number;
  neighbors: string[];
};

export function getNeighborsHex(id: number, cols: number, rows: number): number[] {
  const { col, row } = getColRow(id, cols);
  const neighbors: number[] = [];
  if (col) neighbors.push(id - 1);
  if (col < cols - 1) neighbors.push(id + 1);
  if (row) {
    neighbors.push(id - cols);
    if (row % 2) {
      if (col < cols - 1) neighbors.push(id - cols + 1);
    } else if (col > 0) {
      neighbors.push(id - cols - 1);
    }
  }
  if (row < rows - 1) {
    neighbors.push(id + cols);
    if (row % 2) {
      if (col < cols - 1) neighbors.push(id + cols + 1);
    } else if (col > 0) {
      neighbors.push(id + cols - 1);
    }
  }
  return neighbors;
}

export function initDataHex(args: { height: number; width: number }): {
  cellSize: number;
  pathSize: number;
  wallSize: number;
  rows: number;
  cols: number;
  cells: Record<string, HexCell>;
  links: [string, string][];
  visited: Set<string>;
  stack: string[];
} {
  const { height, width } = args;
  const cellSize = Math.max(5, Math.min(10, Math.min(height, width) / 20));
  const pathSize = 0.8 * cellSize;
  const wallSize = 0.1 * cellSize;
  const rows = Math.floor((4 * height) / (6 * cellSize) - 0.5);
  const cols = Math.floor(width / (2 * cellSize * HALF_SQRT3) - 0.5);
  const nbCells = rows * cols;

  const cells: Record<string, HexCell> = {};
  for (let id = 0; id < nbCells; id++) {
    const key = String(id);
    cells[key] = {
      id: key,
      ...getColRow(id, cols),
      neighbors: getNeighborsHex(id, cols, rows).map(String)
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

export function getCoordsHex(args: { cell: { col: number; row: number }; cellSize: number; wallSize: number }): [number, number] {
  const { cell, cellSize, wallSize } = args;
  const { col, row } = cell;
  return [
    wallSize / 2 + ((row % 2 ? 1 : 0.5) + col) * HALF_SQRT3 * cellSize * 2,
    wallSize / 2 + (1 + 1.5 * row) * cellSize
  ];
}

export function drawItemHex(args: {
  cell: HexCell;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  wallColor: string;
  wallSize: number;
}): void {
  const { cell, ctx, cellSize, wallColor, wallSize } = args;
  const center = getCoordsHex({ cell, cellSize, wallSize });
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  ctx.beginPath();
  ctx.moveTo(center[0], center[1] - cellSize);
  ctx.lineTo(center[0] - HALF_SQRT3 * cellSize, center[1] - 0.5 * cellSize);
  ctx.lineTo(center[0] - HALF_SQRT3 * cellSize, center[1] + 0.5 * cellSize);
  ctx.lineTo(center[0], center[1] + cellSize);
  ctx.lineTo(center[0] + HALF_SQRT3 * cellSize, center[1] + 0.5 * cellSize);
  ctx.lineTo(center[0] + HALF_SQRT3 * cellSize, center[1] - 0.5 * cellSize);
  ctx.closePath();
  ctx.stroke();
}

export const drawLinkHex = makeDrawLink(getCoordsHex);
