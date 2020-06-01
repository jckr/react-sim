import { HALF_SQRT3, drawLink, getColRow } from './helpers';

export const getNeighborsTriangle = (id, cols, rows) => {
  const { col, row } = getColRow(id, cols);
  const neighbors = [];
  if (col) {
    neighbors.push(id - 1);
  }
  if (col < cols - 1) {
    neighbors.push(id + 1);
  }
  if ((col + row) % 2) {
    // triangle pointing down
    if (row) {
      neighbors.push(id - cols);
    }
  } else {
    if (row < rows - 1) {
      neighbors.push(id + cols);
    }
  }
  return neighbors;
};

export const initDataTriangle = ({ cellSize, height, width }) => {
  const rows = Math.floor(height / (cellSize * HALF_SQRT3));
  const cols = Math.floor((2 * width) / cellSize) - 1;
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
      neighbors: getNeighborsTriangle(id, cols, rows),
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

export const getCoordsTriangle = ({ cell, cellSize, wallSize }) => {
  const { col, row } = cell;
  return [
    wallSize / 2 + ((col + 1) * cellSize) / 2,
    wallSize / 2 +
      (row + ((row + col) % 2 ? 1 / 3 : 2 / 3)) * HALF_SQRT3 * cellSize,
  ];
};

export const drawItemTriangle = ({
  cell,
  ctx,
  cellSize,
  wallColor,
  wallSize,
}) => {
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  const { col, row } = cell;
  const isPointingDown = (col + row) % 2;

  ctx.beginPath();
  if (isPointingDown) {
    ctx.moveTo(
      wallSize / 2 + (col * cellSize) / 2,
      wallSize / 2 + row * cellSize * HALF_SQRT3
    );
    ctx.lineTo(
      wallSize / 2 + ((col + 2) * cellSize) / 2,
      wallSize / 2 + row * cellSize * HALF_SQRT3
    );
    ctx.lineTo(
      wallSize / 2 + ((col + 1) * cellSize) / 2,
      wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3
    );
  } else {
    ctx.moveTo(
      wallSize / 2 + (col * cellSize) / 2,
      wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3
    );
    ctx.lineTo(
      wallSize / 2 + ((col + 2) * cellSize) / 2,
      wallSize / 2 + (row + 1) * cellSize * HALF_SQRT3
    );
    ctx.lineTo(
      wallSize / 2 + ((col + 1) * cellSize) / 2,
      wallSize / 2 + row * cellSize * HALF_SQRT3
    );
  }
  ctx.closePath();
  ctx.stroke();
  return;
};

export const drawLinkTriangle = drawLink(getCoordsTriangle);
