import React from 'react';
import { CanvasFrame } from 'react-sim';

import Model from './framed-model';

import { drawItemSquare, drawLinkSquare, initDataSquare } from './mazes/square';
import { drawItemHex, drawLinkHex, initDataHex } from './mazes/hex';
import {
  drawItemTriangle,
  drawLinkTriangle,
  initDataTriangle,
} from './mazes/triangle';
import { drawItemCircle, drawLinkCircle, initDataCircle } from './mazes/circle';

const grids = ['square', 'hexagonal', 'triangular', 'circle'];

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
  ticksPerAnimation: 1,
};

export const initData = (
  { cellSize, height, width, grid },
  random = Math.random
) => {
  // the way the dataset is initialized depends on the
  // grid mode.

  if (grid === 'circle') {
    return initDataCircle({ cellSize, height, width }, random);
  }
  if (grid === 'square') {
    return initDataSquare({ cellSize, height, width });
  }
  if (grid === 'hexagonal') {
    return initDataHex({ cellSize, height, width });
  }
  if (grid === 'triangular') {
    return initDataTriangle({ cellSize, height, width });
  }
};
export const updateData = (
  { data: { cells, links, stack, visited, ...otherData }, params, complete },
  random = Math.random
) => {
  // the algorithm to parse the graph is the same
  // regardless of disposition of the grid
  let options = [];
  let currentCell;

  if (visited.size === Object.values(cells).length || stack.length === 0) {
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
  // likewise, the overall idea to draw the maze is the same
  // regardless of its layout
  if (tick === 0) {
    ctx.clearRect(0, 0, height, width);
    Object.values(cells).forEach(cell =>
      drawCell({
        cell,
        circle,
        ctx,
        grid,
        height,
        width,
        ...otherData,
        ...otherParams,
      })
    );
  } else {
    for (let i = tick - ticksPerAnimation; i < tick; i++) {
      drawLink({
        cells,
        circle,
        ctx,
        grid,
        height,
        width,
        link: links[i],
        ...otherData,
        ...otherParams,
      });
    }
  }
};

export const drawCell = ({ cell, ctx, grid, ...other }) => {
  // but how each cell is drawn depends on the layout
  if (grid === 'circle') {
    drawItemCircle({ cell, ctx, ...other });
  }
  if (grid === 'hexagonal') {
    drawItemHex({ cell, ctx, ...other });
  }
  if (grid === 'square') {
    drawItemSquare({ cell, ctx, ...other });
  }
  if (grid === 'triangular') {
    drawItemTriangle({ cell, ctx, ...other });
  }
  return null;
};

export const drawLink = ({ cells, ctx, circle, grid, link, ...other }) => {
  // and how each link between 2 cells is drawn depends on layout, too.
  if (link === undefined) {
    return;
  }
  if (grid === 'square') {
    drawLinkSquare({ cells, ctx, circle, link, ...other });
  }
  if (grid === 'hexagonal') {
    drawLinkHex({ cells, ctx, circle, link, ...other });
  }
  if (grid === 'triangular') {
    drawLinkTriangle({ cells, ctx, circle, link, ...other });
  }
  if (grid === 'circle') {
    drawLinkCircle({ cells, ctx, circle, link, ...other });
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
