import React from "react";
import { FlexRow, FlexColumn, Model } from "react-sim";

import {
  UP,
  RIGHT,
  DOWN,
  LEFT,
  getRandomInBounds,
  v,
  opposite,
  positionFruit,
  IS_VERTICAL,
  IS_HORIZONTAL,
  getLongestPath,
  getActionGrid
} from "./helpers";

// update

export function updateSnake({ data, params, complete }) {
  const { actionGrid, grid, direction, head, fruit, length } = data;
  const { fruitGrowth, height, width } = params;
  let isFull = true;
  const updatedGrid = grid.map(row =>
    row.map(cell => {
      if (cell === 0 || cell + 1 > length) {
        isFull = false;
        return 0;
      }
      return cell + 1;
    })
  );

  if (isFull) {
    complete();
  }
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

  // computing next direction, thanks to the action grid
  const updatedDirection = actionGrid[updatedHead[1]][updatedHead[0]];

  // checking if fruit is eaten, if so, increasing length - repositioning fruit
  let updatedLength = length;
  let updatedFruit = fruit ? [fruit[0], fruit[1]] : null;
  if (
    updatedFruit &&
    updatedHead[0] === fruit[0] &&
    updatedHead[1] === fruit[1]
  ) {
    updatedLength = updatedLength + fruitGrowth;
    updatedFruit = positionFruit(updatedGrid);
  }

  return {
    actionGrid,
    direction: updatedDirection,
    fruit: updatedFruit,
    grid: updatedGrid,
    head: updatedHead,
    length: updatedLength
  };
}

// init

function initSnake({ height, width, initialLength }) {
  const direction = Math.floor(Math.random() * 4);

  // bounding box where the snake head can be

  const minX = direction === RIGHT ? initialLength + 2 : 2;
  const maxX = width - 1 - (direction === LEFT ? initialLength + 2 : 2);
  const minY = direction === DOWN ? initialLength + 2 : 2;
  const maxY = height - 1 - (direction === UP ? initialLength + 2 : 2);

  // position of snake head

  const xHead = getRandomInBounds(minX, maxX);
  const yHead = getRandomInBounds(minY, maxY);

  // initial empty grid

  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  let tail = [];

  // positioning snake

  for (let s = 0; s < initialLength; s++) {
    // opposite[direction] - if direction is right, we
    // want to draw snake left of its head

    // v - x,y vector of movement for a direction

    const x = xHead + s * v[opposite[direction]][0];
    const y = yHead + s * v[opposite[direction]][1];

    // grid - 1 = head, 2 ... n = body of snake, 0 = empty cells
    grid[y][x] = s + 1;
    // tail will be overwritten until the actual tail isn't
    tail = [x, y];
  }

  const behindTail = [
    tail[0] + v[opposite[direction]][0],
    tail[1] + v[opposite[direction]][1]
  ];
  const head = [xHead, yHead];
  const frontOfSnake = [xHead + v[direction][0], yHead + v[direction][1]];

  const fruit = positionFruit(grid);

  const longestPath = getLongestPath({
    grid,
    start: frontOfSnake,
    end: behindTail
  });
  const actionGrid = getActionGrid({ grid, path: longestPath, direction });

  return {
    head: [xHead, yHead],
    grid,
    direction,
    actionGrid,
    fruit,
    length: initialLength
  };
}

const SnakeBit = ({ size, color, directionNext, directionPrev }) => {
  if (directionNext === null) {
    // tail
    return SnakeBit({
      size,
      color,
      directionNext: directionPrev,
      directionPrev: null
    });
  }
  if (directionPrev === null) {
    // head, or "reversed tail"
    return (
      <div style={{ height: size, width: size, position: "relative" }}>
        <div
          style={{
            borderRadius: "50%",
            height: size / 3,
            width: size / 3,
            background: color,
            left: size / 3,
            top: size / 3,
            position: "absolute"
          }}
        />
        <div
          style={{
            position: "absolute",
            background: color,
            ...(IS_VERTICAL[directionNext]
              ? { width: size / 3, left: size / 3, height: size / 2 }
              : { width: size / 2, top: size / 3, height: size / 3 }),
            ...(directionNext === UP ? { top: 0 } : {}),
            ...(directionNext === DOWN ? { bottom: 0 } : {}),
            ...(directionNext === LEFT ? { left: 0 } : {}),
            ...(directionNext === RIGHT ? { right: 0 } : {})
          }}
        />
      </div>
    );
  }
  if (directionNext === opposite[directionPrev]) {
    // vertical, or horizontal
    return (
      <div style={{ height: size, width: size, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            background: color,
            ...(IS_VERTICAL[directionNext]
              ? {
                  width: size / 3,
                  height: size,
                  left: size / 3
                }
              : { width: size, height: size / 3, top: size / 3 })
          }}
        />
      </div>
    );
  }
  // corner

  const goesUp = directionNext === UP || directionPrev === UP;
  const goesLeft = directionNext === LEFT || directionPrev === LEFT;

  const direction = goesUp
    ? goesLeft
      ? "topleft"
      : "topright"
    : goesLeft
    ? "bottomleft"
    : "bottomright";

  const borderRadius = {
    topleft: "0 0 100% 0",
    topright: "0 0 0 100%",
    bottomleft: "0 100% 0 0",
    bottomright: "100% 0 0 0"
  }[direction];

  const position = {
    ...(goesUp ? { top: 0 } : { bottom: 0 }),
    ...(goesLeft ? { left: 0 } : { right: 0 })
  };

  const cornerStyles = {
    borderRadius,
    ...position
  };

  return (
    <div
      style={{
        height: size,
        width: size,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          background: color,
          width: (2 * size) / 3,
          height: (2 * size) / 3,
          ...cornerStyles
        }}
      />
      <div
        style={{
          position: "absolute",
          background: "white",
          width: size / 3,
          height: size / 3,
          ...cornerStyles
        }}
      />
    </div>
  );
};

const ActionBit = ({ size, action }) => (
  <div
    style={{
      boxSizing: 'border-box',
      position: "relative",
      height: size,
      width: size,
      border: "1px solid #eee"
    }}
  >
    <div
      style={{
        position: "absolute",
        height: 0,
        width: size - 1,
        border: "1px dashed #555",
        transformOrigin: "0 100%",
        left: (size - 1) / 2,
        top: (size - 1) / 2,
        transform: `rotate(${(action - 1) * 90}deg)`
      }}
    />
  </div>
);

export class SnakeFrame extends React.Component {
  static defaultProps = {
    width: 30,
    height: 30,
    initialLength: 4
  };
  renderAG = () => {
    const { actionGrid } = this.props?.data;
    if (!actionGrid) {
      return null;
    }
    const { cellSize: size } = this.props.params;

    return (
      <div className="actions" style={{ position: "absolute" }}>
        {actionGrid.map((row, r) => (
          <FlexRow key={`ar-${r}`}>
            {row.map((cell, c) => (
              <ActionBit size={size} action={cell} key={`arc-${r}-${c}`} />
            ))}
          </FlexRow>
        ))}
      </div>
    );
  };

  renderSnake = () => {
    const { cellSize: size } = this.props.params;
    const { grid, fruit } = this.props?.data;
    if (!grid) {
      return null;
    }
    return (
      <FlexColumn className="snake">
        {grid.map((row, r) => (
          <FlexRow key={`sr-${r}`}>
            {row.map((cell, c) => {
              if (cell === 0) {
                return (
                  <div
                    key={`fruit-${r}-${c}`}
                    style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  >
                    {c === fruit[0] && r === fruit[1] ? "🍎" : ""}
                  </div>
                );
              } else {
                let directionNext = null;
                let directionPrev = null;
                if (grid[r][c + 1]) {
                  if (grid[r][c + 1] === cell + 1) {
                    directionPrev = RIGHT;
                  }
                  if (grid[r][c + 1] === cell - 1) {
                    directionNext = RIGHT;
                  }
                }
                if (grid[r][c - 1]) {
                  if (grid[r][c - 1] === cell + 1) {
                    directionPrev = LEFT;
                  }
                  if (grid[r][c - 1] === cell - 1) {
                    directionNext = LEFT;
                  }
                }
                if (grid[r + 1] && grid[r + 1][c]) {
                  if (grid[r + 1][c] === cell + 1) {
                    directionPrev = DOWN;
                  }
                  if (grid[r + 1][c] === cell - 1) {
                    directionNext = DOWN;
                  }
                }
                if (grid[r - 1] && grid[r - 1][c]) {
                  if (grid[r - 1][c] === cell + 1) {
                    directionPrev = UP;
                  }
                  if (grid[r - 1][c] === cell - 1) {
                    directionNext = UP;
                  }
                }
                return (
                  <SnakeBit
                    size={size}
                    color="green"
                    directionNext={directionNext}
                    directionPrev={directionPrev}
                    key={`src-${r}-${c}`}
                  />
                );
              }
            })}
          </FlexRow>
        ))}
      </FlexColumn>
    );
  };
  renderFruit() {}
  render() {
    const { data } = this.props;
    if (data === null) {
      return null;
    }

    const { actionGrid, grid } = data;
    const { width, height, cellSize } = this.props.params;
    return (
      <div
        style={{
          width: width * cellSize,
          height: height * cellSize,
          border: "2px solid black",
          padding: cellSize
        }}
      >
        {this.renderAG()}
        {this.renderSnake()}
        {this.renderFruit()}
      </div>
    );
  }
}

const Snake = () => (
  <Model
    auto={false}
    maxTime={Infinity}
    initData={initSnake}
    initialParams={{
      cellSize: 25,
      fruitGrowth: 4,
      height: 20,
      width: 20,
      initialLength: 4
    }}
    updateData={updateSnake}
  >
    <SnakeFrame />
  </Model>
);

export default Snake;
