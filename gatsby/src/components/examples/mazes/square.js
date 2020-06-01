import { getColRow, drawLink } from './helpers';

export const getNeighborsSquare = (id, cols, rows) => {
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
  }
  if (row < rows - 1) {
    neighbors.push(id + cols);
  }
  return neighbors;
};

export const initDataSquare = (
  { cellSize, height, width, grid },
  random = Math.random
) => {
  const rows = Math.floor(height / cellSize);
  const cols = Math.floor(width / cellSize);
  const nbCells = rows * cols;
  // we're building an object where:
  // the key is an id that goes from 0 to nbCells,
  // the content is a cell object that contains:
  // id, id of neighbors, plus column and row # for that cell

  const cells = [...Array(nbCells).keys()].reduce((prev, id) => {
    prev[id] = {
      id,
      ...getColRow(id, cols),
      neighbors: getNeighborsSquare(id, cols, rows),
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

export const getCoordsSquare = ({ cell, cellSize, wallSize }) => {
  const { col, row } = cell;
  return [
    wallSize / 2 + (col + 0.5) * cellSize,
    wallSize / 2 + (row + 0.5) * cellSize,
  ];
};

export const drawItemSquare = ({
  cell,
  ctx,
  cellSize,
  wallColor,
  wallSize,
}) => {
  const center = getCoordsSquare({ cell, cellSize, wallSize });
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  ctx.strokeRect(
    center[0] - 0.5 * cellSize,
    center[1] - 0.5 * cellSize,
    cellSize,
    cellSize
  );
};

export const drawLinkSquare = drawLink(getCoordsSquare);
