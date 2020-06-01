import { HALF_SQRT3, getColRow } from './helpers';

export const getNeighborsHex = (id, cols, rows) => {
  const { col, row } = getColRow(id, cols);
  const neighbors = [];
  if (col) {
    neighbors.push(id - 1);
  }
  if (col < cols - 1) {
    neighbors.push(id + 1);
  }
  if (row) {
    neighbors.push(id - cols);
    if (row % 2) {
      if (col < cols - 1) {
        neighbors.push(id - cols + 1);
      }
    } else {
      if (col > 0) {
        neighbors.push(id - cols - 1);
      }
    }
  }
  if (row < rows - 1) {
    neighbors.push(id + cols);
    if (row % 2) {
      if (col < cols - 1) {
        neighbors.push(id + cols + 1);
      }
    } else {
      if (col > 0) {
        neighbors.push(id + cols - 1);
      }
    }
  }
  return neighbors;
};

export const initDataHex = ({ cellSize, height, width }) => {
  const rows = Math.floor((4 * height) / (6 * cellSize) - 0.5);
  const cols = Math.floor(width / (2 * cellSize * HALF_SQRT3) - 0.5);
  const nbCells = rows * cols;

  // same as for squares:
  // we're building an object where:
  // the key is an id that goes from 0 to nbCells,
  // the content is a cell object that contains:
  // id, id of neighbors, plus column and row # for that cell

  const cells = [...Array(nbCells).keys()].reduce((prev, id) => {
    prev[id] = {
      id,
      ...getColRow(id, cols),
      neighbors: getNeighbors[grid](id, cols, rows),
    };
    return prev;
  }, {});

  return {
    rows,
    cols,
    cells,
    links: [],
    visited: new Set([0]),
    currentCell: 0,
    stack: [0],
  };
};

export const getCoordsHex = ({ cell, cellSize, wallSize }) => {
  const { col, row } = cell;
  return [
    wallSize / 2 + ((row % 2 ? 1 : 0.5) + col) * HALF_SQRT3 * cellSize * 2,
    wallSize / 2 + (1 + 1.5 * row) * cellSize,
  ];
};

export const drawItemHex = ({ cell, ctx, cellSize, wallColor, wallSize }) => {
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
  return;
};
