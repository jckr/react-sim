import React from 'react';
import { Flex } from 'rebass';

import {IS_VERTICAL, UP, RIGHT, DOWN, LEFT, opposite} from './helpers';

const SnakeBit = ({ size, color, directionNext, directionPrev, weight }) => {
  if (directionNext === null) {
    // tail
    if (directionPrev === null) {
      console.log('warning - double null');
      return null;
    }
    return SnakeBit({
      size,
      color,
      weight,
      directionNext: directionPrev,
      directionPrev: null,
    });
  }
  const margin = (1 - weight) / 2;
  const ms = margin * size;
  const ws = weight * size;

  if (directionPrev === null) {
    // head, or "reversed tail"
    return (
      <div style={{ height: size, width: size, position: 'relative' }}>
        <div
          style={{
            borderRadius: '50%',
            height: ws,
            width: ws,
            background: color,
            left: ms,
            top: ms,
            position: 'absolute',
          }}
        />
        <div
          style={{
            position: 'absolute',
            background: color,
            ...(IS_VERTICAL[directionNext]
              ? { width: ws, left: ms, height: size / 2 }
              : { width: size / 2, top: ms, height: ws }),
            ...(directionNext === UP ? { top: 0 } : {}),
            ...(directionNext === DOWN ? { bottom: 0 } : {}),
            ...(directionNext === LEFT ? { left: 0 } : {}),
            ...(directionNext === RIGHT ? { right: 0 } : {}),
          }}
        />
      </div>
    );
  }
  if (directionNext === opposite[directionPrev]) {
    // vertical, or horizontal
    return (
      <div style={{ height: size, width: size, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            background: color,
            ...(IS_VERTICAL[directionNext]
              ? {
                  width: ws,
                  height: size,
                  left: ms,
                }
              : { width: size, height: ws, top: ms }),
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
      ? 'topleft'
      : 'topright'
    : goesLeft
    ? 'bottomleft'
    : 'bottomright';

  const borderRadius = {
    topleft: '0 0 100% 0',
    topright: '0 0 0 100%',
    bottomleft: '0 100% 0 0',
    bottomright: '100% 0 0 0',
  }[direction];

  const position = {
    ...(goesUp ? { top: 0 } : { bottom: 0 }),
    ...(goesLeft ? { left: 0 } : { right: 0 }),
  };

  const cornerStyles = {
    borderRadius,
    ...position,
  };

  return (
    <div
      style={{
        height: size,
        width: size,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          background: color,
          width: ws + ms,
          height: ws + ms,
          ...cornerStyles,
        }}
      />
      <div
        style={{
          position: 'absolute',
          background: 'white',
          width: ms,
          height: ms,
          ...cornerStyles,
        }}
      />
    </div>
  );
};

const ActionBit = ({ size, action }) => (
  <div
    style={{
      boxSizing: 'border-box',
      position: 'relative',
      height: size,
      width: size,
      border: '1px solid #eee',
    }}
  >
    <div
      style={{
        position: 'absolute',
        height: 0,
        width: size - 1,
        border: action === undefined ? 'none' : '1px dashed #555',
        transformOrigin: '0 100%',
        left: (size - 1) / 2,
        top: (size - 1) / 2,
        transform: `rotate(${(action - 1) * 90}deg)`,
      }}
    />
  </div>
);

export class SnakeFrame extends React.Component {
  static defaultProps = {
    width: 30,
    height: 30,
    initialLength: 4,
  };
  renderAG = () => {
    const { actionGrid } = this.props?.data;
    if (!actionGrid) {
      return null;
    }
    const { cellSize: size } = this.props.params;

    return (
      <div className="actions" style={{ position: 'absolute' }}>
        {actionGrid.map((row, r) => (
          <Flex flexDirection='row'  key={`ar-${r}`}>
            {row.map((cell, c) => (
              <ActionBit size={size} action={cell} key={`arc-${r}-${c}`} />
            ))}
          </Flex>
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
      <Flex flexDirection='column'  className="snake">
        {grid.map((row, r) => (
          <Flex flexDirection='row'  key={`sr-${r}`}>
            {row.map((cell, c) => {
              if (cell === 0) {
                return (
                  <div
                    key={`fruit-${r}-${c}`}
                    style={{
                      width: size,
                      height: size,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {fruit && c === fruit[0] && r === fruit[1] ? '🍎' : ''}
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
                    weight={0.8}
                    color="green"
                    directionNext={directionNext}
                    directionPrev={directionPrev}
                    key={`src-${r}-${c}`}
                  />
                );
              }
            })}
          </Flex>
        ))}
      </Flex>
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
          boxSizing: 'content-box',
          width: width * cellSize,
          height: height * cellSize,
          border: '2px solid black',
          padding: cellSize,
        }}
      >
        {this.renderAG()}
        {this.renderSnake()}
        {this.renderFruit()}
      </div>
    );
  }
}
