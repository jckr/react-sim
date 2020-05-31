import React from 'react';
import { CanvasFrame } from 'react-sim';

import Model from './framed-model';

const HALF_SQRT3 = Math.sqrt(3) / 2;
const grids = ['square', 'hexagonal', 'triangular'];

const getColRow = (id, cols) => {
  const col = id % cols;
  const row = (id - col) / cols;
  return [col, row];
};

export const params = {
  width: 332,
  height: 332,
  grid: 'square',
  cellSize: 10,
  pathSize: 5,
  wallSize: 2,
  wallColor: '#000',
  pathColor: '#fff',
  maxTime: Infinity,
  ticksPerAnimation: 20,
};

const getNeighbors = {
  hexagonal: (id, cols, rows) => {
    const [col, row] = getColRow(id, cols);
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
  },
  square: (id, cols, rows) => {
    const [col, row] = getColRow(id, cols);
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
  },
  triangular: (id, cols, rows) => {
    const [col, row] = getColRow(id, cols);
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
  },
};

export const initData = ({ cellSize, height, width, grid }) => {
  if (grid === 'square') {
    const rows = Math.floor(height / cellSize);
    const cols = Math.floor(width / cellSize);
    const nbCells = rows * cols;
    const cells = [...Array(nbCells).keys()].map(id => ({
      id,
      neighbors: getNeighbors[grid](id, cols, rows),
    }));
    return {
      rows,
      cols,
      cells,
      links: [],
      visited: new Set([0]),
      currentCell: 0,
      stack: [0],
    };
  }
  if (grid === 'hexagonal') {
    const rows = Math.floor((4 * height) / (6 * cellSize) - 0.5);
    const cols = Math.floor(width / (2 * cellSize * HALF_SQRT3) - 0.5);
    const nbCells = rows * cols;

    const cells = [...Array(nbCells).keys()].map(id => ({
      id,
      neighbors: getNeighbors[grid](id, cols, rows),
    }));

    return {
      rows,
      cols,
      cells,
      links: [],
      visited: new Set([0]),
      currentCell: 0,
      stack: [0],
    };
  }
  if (grid === 'triangular') {
    const rows = Math.floor(height / (cellSize * HALF_SQRT3));
    const cols = Math.floor((2 * width) / cellSize) - 1;
    const nbCells = rows * cols;
    const cells = [...Array(nbCells).keys()].map(id => ({
      id,
      neighbors: getNeighbors[grid](id, cols, rows),
    }));
    return {
      rows,
      cols,
      cells,
      links: [],
      visited: new Set([0]),
      currentCell: 0,
      stack: [0],
    };
  }
};
export const updateData = (
  { data: { cells, links, stack, visited, ...otherData }, params, complete },
  random = Math.random
) => {
  // algorithm to parse the graph is the same
  // regardless of disposition of the grid
  let options = [];
  let currentCell;
  if (visited.size === cells.length || stack.length === 0) {
    complete();
  } else {
    while (options.length === 0 && stack.length) {
      currentCell = stack.pop();
      options = cells[currentCell].neighbors.filter(d => !visited.has(d));
    }
    const option = Math.floor(random() * options.length);
    const nextMove = options[option];
    visited.add(nextMove);
    links.push([currentCell, nextMove]);
    stack.push(currentCell);
    stack.push(nextMove);
  }
  return {
    ...otherData,
    cells,
    links,
    stack,
    visited,
  };
};

export const draw = ({
  params: { height, width, grid, ticksPerAnimation, ...otherParams },
  data: { cells, links, ...otherData },
  tick,
  circle,
  ctx,
}) => {
  if (tick === 0) {
    ctx.clearRect(0, 0, height, width);
    cells.forEach(cell =>
      drawCell({ ctx, grid, id: cell.id, ...otherData, ...otherParams })
    );
  } else {
    for (let i = tick - ticksPerAnimation; i < tick; i++) {
      drawLink({
        circle,
        ctx,
        grid,
        link: links[i],
        ...otherData,
        ...otherParams,
      });
    }
  }
};

export const getCoords = ({ id, grid, ...other }) => {
  if (grid === 'hexagonal') {
    const { cellSize, wallSize, cols } = other;
    const [col, row] = getColRow(id, cols);
    return [
      wallSize / 2 + ((row % 2 ? 1 : 0.5) + col) * HALF_SQRT3 * cellSize * 2,
      wallSize / 2 + (1 + 1.5 * row) * cellSize,
    ];
  }
  if (grid === 'square') {
    const { cellSize, cols, wallSize } = other;
    const [col, row] = getColRow(id, cols);
    return [
      wallSize / 2 + (col + 0.5) * cellSize,
      wallSize / 2 + (row + 0.5) * cellSize,
    ];
  }
  if (grid === 'triangular') {
    const { cellSize, cols, wallSize } = other;
    const [col, row] = getColRow(id, cols);
    return [
      wallSize / 2 + ((col + 1) * cellSize) / 2,
      wallSize / 2 +
        (row + ((row + col) % 2 ? 1 / 3 : 2 / 3)) * HALF_SQRT3 * cellSize,
    ];
  }
  return null;
};

export const drawCell = ({ ctx, grid, id, ...other }) => {
  if (grid === 'hexagonal') {
    const center = getCoords({ id, grid, ...other });
    const { cellSize, wallColor, wallSize } = other;
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
  }
  if (grid === 'square') {
    const center = getCoords({ id, grid, ...other });
    const { cellSize, wallColor, wallSize } = other;
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = wallSize;
    ctx.strokeRect(
      center[0] - 0.5 * cellSize,
      center[1] - 0.5 * cellSize,
      cellSize,
      cellSize
    );
    return;
  }
  if (grid === 'triangular') {
    const center = getCoords({ id, grid, ...other });
    const { cellSize, cols, wallColor, wallSize } = other;
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = wallSize;
    const [col, row] = getColRow(id, cols);
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
  }
  return null;
};

export const drawLink = ({ ctx, circle, grid, link, ...other }) => {
  if (link === undefined) {
    return;
  }
  if (grid === 'square' || grid === 'hexagonal' || grid === 'triangular') {
    const { cellSize, cols, pathColor, pathSize, wallSize } = other;

    const start = getCoords({ id: link[0], cellSize, cols, grid, wallSize });
    const end = getCoords({ id: link[1], cellSize, cols, grid, wallSize });

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
  }
};

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

const Maze = () => (
  <Model
    initialParams={params}
    initData={initData}
    updateData={updateData}
    controls={{
      type: 'radio',
      vertical: true,
      options: grids,
      param: 'grid',
      resetOnChange: true,
    }}
  >
    <Frame />
  </Model>
);

export default Maze;
