import {
  UP,
  RIGHT,
  DOWN,
  LEFT,
  addToGrid,
  extendPath,
  getActionGrid,
  getLongestPath,
  getRandomInBounds,
  getShortestPath,
  initVisited,
  opposite,
  positionFruit,
  v,
} from './helpers';

// init

export function initSnake(
  {
    directionRandom,
    directionText,
    height,
    width,
    initialLength,
    snakePosRandom,
    xHead,
    yHead,
  },
  random = Math.random
) {
  const direction = directionRandom
    ? Math.floor(random * 4)
    : { up: 0, right: 1, down: 2, left: 3 }[directionText];

  // position of snake head

  const minX = direction === RIGHT ? initialLength + 2 : 2;
  const maxX = width - 1 - (direction === LEFT ? initialLength + 2 : 2);
  const minY = direction === DOWN ? initialLength + 2 : 2;
  const maxY = height - 1 - (direction === UP ? initialLength + 2 : 2);

  if (snakePosRandom) {
    // bounding box where the snake head can be

    xHead = getRandomInBounds(minX, maxX, random);
    yHead = getRandomInBounds(minY, maxY, random);
  } else {
    xHead = Math.min(maxX, Math.max(minX, xHead));
    yHead = Math.min(maxY, Math.max(minY, yHead));
  }

  // initial empty grid

  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  const head = [xHead, yHead];
  let tail = [];
  let snakePath = [];
  // positioning snake

  for (let s = 0; s < initialLength; s++) {
    // opposite[direction] - if direction is right, we
    // want to draw snake left of its head

    // v - x,y vector of movement for a direction

    const x = xHead + s * v[opposite[direction]][0];
    const y = yHead + s * v[opposite[direction]][1];

    // grid - 1 = head, 2 ... n = body of snake, 0 = empty cells
    grid[y][x] = s + 1;

    snakePath.unshift([x, y]);
    // tail will be overwritten until the actual tail isn't
    tail = [x, y];
  }

  const behindTail = [
    tail[0] + v[opposite[direction]][0],
    tail[1] + v[opposite[direction]][1],
  ];

  const frontOfSnake = [xHead + v[direction][0], yHead + v[direction][1]];

  return {
    behindTail,
    direction,
    frontOfSnake,
    grid,
    length: initialLength,
    head,
    snakePath,
    tail,
  };
}

export function initSnakeGrid(params, random = Math.random) {
  const { grid, head, tail, direction, snakePath } = initSnake(params, random);

  const { height, width } = params;
  const stack = getShortestPath({ grid, start: head, end: tail });
  const visited = initVisited(grid, stack);
  const longestPath = [...snakePath, stack.shift()];

  const actionGrid = getActionGrid({
    grid,
    path: longestPath,
    stack,
    direction,
  });
  return {
    actionGrid,
    direction,
    grid,
    stack,
    visited,
    longestPath,
  };
}

export function initSnakeGame(params, random = Math.random) {
  const {
    grid,
    frontOfSnake,
    behindTail,
    head,
    tail,
    direction,
    length,
    snakePath,
  } = initSnake(params, random);

  const fruit = positionFruit(grid, random);

  const longestPath = getLongestPath({
    grid,
    start: head,
    end: tail,
  });

  const actionGrid = getActionGrid({ grid, path: longestPath, direction });

  return {
    head,
    grid,
    direction,
    actionGrid,
    fruit,
    length,
    snakePath,
    bestPath: false,
  };
}

// update

export function updateSnake({ data, params, complete }, random = Math.random) {
  const { actionGrid, bestPath, grid, direction, head, fruit, length } = data;
  let updatedActionGrid = actionGrid;
  let updatedBestPath = bestPath;
  const { fruitGrowth, height, width, safeMode } = params;
  let snakePath = [];
  const updatedGrid = grid.map((row, r) =>
    row.map((cell, c) => {
      if (cell === 0 || cell + 1 > length) {
        return 0;
      }
      snakePath[length - cell - 1] = [c, r];
      return cell + 1;
    })
  );
  while (snakePath[0] === undefined) {
    snakePath.shift();
  }
  const tail = snakePath[0];

  // new position of head, based on previous direction
  const updatedHead = [head[0] + v[direction][0], head[1] + v[direction][1]];

  if (
    // collision with snake
    updatedGrid[updatedHead[1]][updatedHead[0]] !== 0 ||
    // collision with walls
    updatedHead[0] >= width ||
    updatedHead[0] < 0 ||
    updatedHead[1] >= height ||
    updatedHead[1] < 0
  ) {
    // ouch
    complete();
  }

  // updating grid
  updatedGrid[updatedHead[1]][updatedHead[0]] = 1;

  if (updatedGrid.every(row => row.every(cell => cell))) {
    // full grid
    complete();
  }

  // checking if fruit is eaten, if so, increasing length - repositioning fruit
  let updatedLength = length;
  let updatedFruit = fruit ? [fruit[0], fruit[1]] : [-1, -1];
  if (
    updatedHead[0] === updatedFruit[0] &&
    updatedHead[1] === updatedFruit[1]
  ) {
    updatedLength = Math.min(height * width, updatedLength + fruitGrowth);
    if (!safeMode) {
      // in safe mode, once we find a path that covers the grid, we stick
      // to it until the end. in unsafe mode, we try to improve it with
      // each fruit.
      updatedBestPath = false;
    }
    updatedFruit = positionFruit(updatedGrid, random);
  }

  // figuring out if action grid should be updated

  if (updatedBestPath === false) {
    const pathToFruit = getShortestPath({
      grid,
      start: updatedHead,
      end: updatedFruit,
    });
    if (pathToFruit) {
      const tailToFruit = [...snakePath, ...pathToFruit];
      const candidateGrid = addToGrid(updatedGrid, tailToFruit);
      const backToTail = getLongestPath({
        grid: candidateGrid,
        start: updatedFruit,
        end: tail,
      });
      if (tailToFruit.length + backToTail.length === height * width + 2) {
        // we found a way to go quickly but safely to the next fruit!

        updatedActionGrid = getActionGrid({
          grid,
          path: tailToFruit,
          stack: backToTail,
        });

        // no need to reevaluate it until next fruit
        updatedBestPath = true;
      }
    }
  }
  // computing next direction, thanks to the action grid
  const updatedDirection = updatedActionGrid[updatedHead[1]][updatedHead[0]];

  return {
    actionGrid: updatedActionGrid,
    bestPath: updatedBestPath,
    direction: updatedDirection,
    fruit: updatedFruit,
    grid: updatedGrid,
    head: updatedHead,
    length: updatedLength,
    snakePath,
  };
}

export function updateSnakeGrid({ data, params, complete }) {
  const { direction, grid, longestPath, stack, visited } = data;
  const { height, width } = params;
  const updatedData = extendPath({
    height,
    longestPath,
    stack,
    visited,
    width,
  });
  const actionGrid = getActionGrid({
    grid,
    path: longestPath,
    stack,
    direction,
  });
  if (stack.length === 0) {
    complete();
  }
  return {
    actionGrid,
    direction,
    grid,
    longestPath: updatedData.longestPath,
    stack: updatedData.stack,
    visited: updatedData.visited,
  };
}
