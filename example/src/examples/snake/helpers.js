// constants

export const UP = 0;
export const RIGHT = 1;
export const DOWN = 2;
export const LEFT = 3;

export const DIRECTIONS = [UP, RIGHT, DOWN, LEFT];

export const opposite = [DOWN, LEFT, UP, RIGHT];
export const IS_VERTICAL = [true, false, true, false];
export const IS_HORIZONTAL = [false, true, false, true];

export const v = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

export const getDir = v.reduce((prev, curr, i) => {
  prev[curr] = i;
  return prev;
}, {});

// helpers

export function getRandomInBounds(min, max) {
  // returns a random integer within [min, max]
  // (bounds are included)
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function isValid(x, y, visited, height, width) {
  // returns whether one of the pathfinding functions can consider a cell
  if (x < 0 || x > width - 1 || y < 0 || y > height - 1) {
    return false;
  }
  if (visited[[x, y]]) {
    return false;
  }
  return true;
}

export function initVisited(grid = [[]], path = []) {
  // refreshes the "visited" object
  // every snake cell in the grid is marked as visited,
  // every cell in the path as well.
  // both are optional.

  // because this is an object, it can be inadvertantly mutated
  // so it's safer to reinitialize it after each use
  const visited = grid.reduce(
    (results, row, r) =>
      row.reduce((rowResults, cell, c) => {
        if (cell > 0) {
          rowResults[[c, r]] = true;
        }
        return rowResults;
      }, results),
    {}
  );
  path.forEach(([r, c]) => (visited[[r, c]] = true));
  return visited;
}

export function getShortestPath({ grid, start, end, direction }) {
  // finds shortest path between start and end given status of a grid
  // where visited cells can't be crossed

  const height = grid.length;
  if (height === 0) {
    return [];
  }
  const width = grid[0].length;

  const visited = initVisited(grid);
  // paths - for each node, shortest path to reach that node from start
  const paths = {};
  const next = [[...start, direction]];
  paths[start] = [start];
  let found = false;
  while (next.length && !found) {
    const node = next.shift();
    const prevDirection = node[2];

    // if the previous direction is known - there are only 3 possible
    // directions for next step, because a u-turn is impossible. we
    // want to privilege straight paths, so we're adding the same
    // direction first.
    // for all UP, RIGHT, DOWN and LEFT, direction + 1 % 4 and direction + 3 % 4
    // are going to be directions to the right and to the left respectively.
    // if we don't know the previous direction, that's fine, we start
    // with all four.
    const directions = prevDirection === undefined ? DIRECTIONS :
      [prevDirection, prevDirection + 1 % 4, prevDirection + 3 % 4];

    directions.forEach(d => {
      // step is next node in that direction, from node
      const step = [node[0] + v[d][0], node[1] + v[d][1]]];
      const [x, y] = step;
      if (!isValid(x, y, visited, height, width)) {
        return;
      }
      visited[step] = true;
      paths[step] = paths[node].concat([step]);
      if (x === end[0] && y === end[1]) {
        found = true;
      }
      // we add each step (with direction) to our queue.
      // it's important to do BFS here
      next.push([...step, d]);
    });
  }
  // out shortest path
  return paths[end];
}

export function getLongestPath({ grid, start, end }) {
  const height = grid.length;
  if (height === 0) {
    return [];
  }
  const width = grid[0].length;

  const stack = getShortestPath({
    grid,
    start,
    end
  });

  const visited = initVisited(grid, stack);
  const longestPath = [stack.shift()];

  // the general idea is that we start from the shortest path from start
  // to end.

  // then, for each segment in that path, we try to see if we can extend
  // it by adding a pair of adjacent points.
  // we continue until we run out of pair of points we can add to that path.

  while (stack.length) {
    const lastInLongestPath = longestPath[longestPath.length - 1];
    visited[lastInLongestPath] = true;
    const nextInStack = stack.shift();

    // last in path to next in stack form a segment.
    // we are trying to see if the 2 points to the right, or 2 points to the left are
    // valid. if so, we'll add them to the stack.

    // ie - last in path = l, next in stack = n, valid = ., invalid = x
    // xxxxxx xxxxxxx xxxxxxx xxxxxxx
    // x.n..x x.....x x.....x x.x...x
    // x.lx.x x..ln.x xxl...x x.nl..x
    // x....x x..x..x x.n...x x.....x
    // xxxxxx xxxxxxx xxxxxxx xxxxxxx
    //
    // in each of these 4 examples, 2 points to the left of ln are both valid.
    // so we can push them to the stack
    // only one of the 2 points to the right of ln are valid. so we can't push them to the stack
    // not 100% sure of that, but i think with how we build the path, having 2 points to right
    // valid and 2 points to left valid is exclusive.
    // valid points = not visited, not off bounds

    const dx = nextInStack[0] - lastInLongestPath[0];
    const dy = nextInStack[1] - lastInLongestPath[1];

    const rightPoints = [
      [lastInLongestPath[0] - dy, lastInLongestPath[1] - dx],
      [nextInStack[0] - dy, nextInStack[1] - dx]
    ];
    const leftPoints = [
      [lastInLongestPath[0] + dy, lastInLongestPath[1] + dx],
      [nextInStack[0] + dy, nextInStack[1] + dx]
    ];

    if (
      isValid(...rightPoints[0], visited, height, width) &&
      isValid(...rightPoints[1], visited, height, width)
    ) {
      stack.unshift(nextInStack);
      stack.unshift(rightPoints[1]);
      stack.unshift(rightPoints[0]);
      visited[rightPoints[0]] = true;
      visited[rightPoints[1]] = true;
    } else {
      if (
        isValid(...leftPoints[0], visited, height, width) &&
        isValid(...leftPoints[1], visited, height, width)
      ) {
        stack.unshift(nextInStack);
        stack.unshift(leftPoints[1]);
        stack.unshift(leftPoints[0]);
        visited[leftPoints[0]] = true;
        visited[leftPoints[1]] = true;
      } else {
        // we can't add either both right points or both left points to stack.
        // Great! we add nextInStack to the path, and continue.
        longestPath.push(nextInStack);
      }
    }
  }

  return longestPath;
}

function getActionsFromGrid(grid) {
  // we can deduce the direction from content of the grid but why would we
  // leaving this in place if we decide the user can initiate the snake however
  // they want
  return grid.map((row, r) =>
    row.map((cell, c) => {
      if (!cell) {
        return undefined;
      }
      // we're guaranteed that non empty cells are never at the edge of grid
      if (grid[r - 1][c] < cell || grid[r + 1][c] > cell) {
        return UP;
      }
      if (grid[r][c - 1] > cell || grid[r][c + 1] < cell) {
        return RIGHT;
      }
      if (grid[r - 1][c] > cell || grid[r + 1][c] < cell) {
        return DOWN;
      }
      if (grid[r][c - 1] < cell || grid[r][c + 1] > cell) {
        return LEFT;
      }
      return undefined;
    })
  );
}

export function getActionGrid({ grid, path, direction }) {
  // we have on one hand, grid which is the position of the snake,
  // and on the other, path which is the longest path from the cell
  // which is in front of the snake to the one behind its tail.

  // what we want is a lookup table that, for every coordinate that the
  // head could find itself on, suggest the corresponding, safe action.

  const actionGrid = grid.map(row =>
    row.map(cell => (cell ? direction : undefined))
  );

  let node;

  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    node = path[i];
    const dx = node[0] - prev[0];
    const dy = node[1] - prev[1];
    const [c, r] = prev;
    actionGrid[r][c] = getDir[[dx, dy]];
  }

  // we should have a complete actionGrid except for the very last node
  // of path

  // it goes towards the tail of the snake. in our case it's direction

  const [c, r] = node;
  actionGrid[r][c] = direction;

  return actionGrid;
}

export function positionFruit(grid) {
  const eligiblePositions = grid.reduce(
    (results, row, r) =>
      row.reduce((resultRow, cell, c) => {
        if (cell === 0) {
          resultRow.push([r, c]);
        }
        return resultRow;
      }, results),
    []
  );
  if (eligiblePositions.length === 0) {
    return null;
  }
  const randomPosition = Math.floor(Math.random() * eligiblePositions.length);
  return eligiblePositions[randomPosition];
}
