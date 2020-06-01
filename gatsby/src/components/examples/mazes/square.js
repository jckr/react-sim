import { getColRow } from './helpers';

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
  const center = getCoords({ cell, grid, ...other });
  const { cellSize, wallColor, wallSize } = other;
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = wallSize;
  ctx.strokeRect(
    center[0] - 0.5 * cellSize,
    center[1] - 0.5 * cellSize,
    cellSize,
    cellSize
  );
};

export const drawLinkSquare = ({
  cells,
  ctx,
  circle,
  link,
  pathColor,
  pathSize,
}) => {
  const startCell = cells[link[0]];
  const endCell = cells[link[1]];

  const start = getCoords({ cell: startCell, cellSize, grid, wallSize });
  const end = getCoords({ cell: endCell, cellSize, grid, wallSize });

  ctx.strokeStyle = pathColor;
  ctx.fillStyle = pathColor;

  circle({ x: start[0], y: start[1], r: pathSize / 2 });
  ctx.fill();
  circle({ x: end[0], y: end[1], r: pathSize / 2 });
  ctx.fill();

  ctx.lineWidth = pathSize;

  ctx.beginPath();
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.closePath();
  ctx.stroke();
};
