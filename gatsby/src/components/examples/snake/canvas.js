import React from 'react';
import { CanvasFrame, withTheme } from 'react-sim';

import { IS_VERTICAL, UP, RIGHT, DOWN, LEFT, opposite } from './helpers';

const snakeToCellRatio = 0.8;

export const draw = ({
  ctx,
  circle,
  data,
  params: {
    cellSize,
    displayGrid,
    displayHead,
    displayCircuit,
    width: cols,
    height: rows,
  },
  height,
  width,
  roundRectangle,
  theme,
  tick,
}) => {
  const { accent, muted, primary, secondary, gray } = theme.colors;
  const {
    bestPath,
    considered,
    snakePath = [],
    actionGrid,
    direction = 0,
    fruit,
  } = data;
  ctx.clearRect(0, 0, width, height);
  // grid

  if (displayGrid) {
    ctx.strokeStyle = gray;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
  // actionGrid
  if (displayCircuit) {
    ctx.strokeStyle = bestPath ? accent : secondary;
    drawActionGrid({ actionGrid, cellSize, circle, considered, ctx });
  }
  // fruit
  if (fruit) {
    ctx.fillStyle = secondary;
    ctx.fillRect(
      (fruit[0] + 0.2) * cellSize,
      (fruit[1] + 0.2) * cellSize,
      0.6 * cellSize,
      0.6 * cellSize
    );
  }
  snakePath.forEach((coords, i) => {
    const next = snakePath[i + 1];
    const [c0, r0] = coords;
    ctx.fillStyle = primary;
    if (next) {
      // not head

      const [c1, r1] = next;
      const x = cellSize * (Math.min(c1, c0) + (1 - snakeToCellRatio) / 2);
      const y = cellSize * (Math.min(r1, r0) + (1 - snakeToCellRatio) / 2);

      const width =
        cellSize * (c0 === c1 ? snakeToCellRatio : 2 - (1 - snakeToCellRatio));
      const height =
        cellSize * (r0 === r1 ? snakeToCellRatio : 2 - (1 - snakeToCellRatio));

      const r = (snakeToCellRatio * cellSize) / 2;
      roundRectangle({ x, y, width, height, r: cellSize / 2 });
      ctx.fill();
    } else {
      if (displayHead) {
        // head
        const x = (c0 + 0.5) * cellSize;
        const y = (r0 + 0.5) * cellSize;
        const r = (cellSize * snakeToCellRatio) / 2;
        circle({ x, y, r });
        ctx.fill();
        ctx.fillStyle = '#fff';
        const prev = snakePath[i - 1];
        // eyes
        switch (direction) {
          case UP:
            circle({ x: x - 0.5 * r, y: y - 0.5 * r, r: 2 });
            ctx.fill();
            circle({ x: x + 0.5 * r, y: y - 0.5 * r, r: 2 });
            ctx.fill();
            break;
          case DOWN:
            circle({ x: x - 0.5 * r, y: y + 0.5 * r, r: 2 });
            ctx.fill();
            circle({ x: x + 0.5 * r, y: y + 0.5 * r, r: 2 });
            ctx.fill();
            break;
          case LEFT:
            circle({ x: x - 0.5 * r, y: y - 0.5 * r, r: 2 });
            ctx.fill();
            circle({ x: x - 0.5 * r, y: y + 0.5 * r, r: 2 });
            ctx.fill();
            break;
          case RIGHT:
            circle({ x: x + 0.5 * r, y: y - 0.5 * r, r: 2 });
            ctx.fill();
            circle({ x: x + 0.5 * r, y: y + 0.5 * r, r: 2 });
            ctx.fill();
            break;
        }
      }
    }
  });
};

export const drawActionGrid = ({
  actionGrid,
  cellSize,
  circle,
  considered,
  ctx,
}) => {
  function horizontal(r, c) {
    ctx.beginPath();
    ctx.moveTo(c * cellSize, (r + 0.5) * cellSize);
    ctx.lineTo((c + 1) * cellSize, (r + 0.5) * cellSize);
    ctx.stroke();
  }
  function vertical(r, c) {
    ctx.beginPath();
    ctx.moveTo((c + 0.5) * cellSize, r * cellSize);
    ctx.lineTo((c + 0.5) * cellSize, (r + 1) * cellSize);
    ctx.stroke();
  }
  function topLeft(r, c) {
    ctx.beginPath();
    ctx.arc(c * cellSize, r * cellSize, cellSize / 2, 0, Math.PI / 2, false);
    ctx.stroke();
  }
  function topRight(r, c) {
    ctx.beginPath();
    ctx.arc(
      (c + 1) * cellSize,
      r * cellSize,
      cellSize / 2,
      Math.PI / 2,
      Math.PI,
      false
    );
    ctx.stroke();
  }
  function bottomLeft(r, c) {
    ctx.beginPath();
    ctx.arc(
      c * cellSize,
      (r + 1) * cellSize,
      cellSize / 2,
      -Math.PI / 2,
      0,
      false
    );
    ctx.stroke();
  }
  function bottomRight(r, c) {
    ctx.beginPath();
    ctx.arc(
      (c + 1) * cellSize,
      (r + 1) * cellSize,
      cellSize / 2,
      Math.PI,
      -Math.PI / 2,
      false
    );
    ctx.stroke();
  }
  if (considered) {
    considered.forEach(([x, y]) => {
      circle({
        x: (x + 0.5) * cellSize,
        y: (y + 0.5) * cellSize,
        r: cellSize / 4,
      });
      ctx.stroke();
    });
  }
  actionGrid.forEach((row, r) => {
    row.forEach((action, c) => {
      switch (action) {
        case UP:
          if (c > 0 && actionGrid[r][c - 1] === RIGHT) {
            topLeft(r, c);
          } else {
            if (actionGrid[r][c + 1] === LEFT) {
              topRight(r, c);
            } else {
              vertical(r, c);
            }
          }
          break;
        case DOWN:
          if (c > 0 && actionGrid[r][c - 1] === RIGHT) {
            bottomLeft(r, c);
          } else {
            if (actionGrid[r][c + 1] === LEFT) {
              bottomRight(r, c);
            } else {
              vertical(r, c);
            }
          }
          break;
        case RIGHT:
          if (r > 0 && actionGrid[r - 1][c] === DOWN) {
            topRight(r, c);
          } else {
            if (actionGrid[r + 1] && actionGrid[r + 1][c] === UP) {
              bottomRight(r, c);
            } else {
              horizontal(r, c);
            }
          }
          break;
        case LEFT:
          if (r > 0 && actionGrid[r - 1][c] === DOWN) {
            topLeft(r, c);
          } else {
            if (actionGrid[r + 1] && actionGrid[r + 1][c] === UP) {
              bottomLeft(r, c);
            } else {
              horizontal(r, c);
            }
          }
          break;
      }
    });
  });
};

const CanvasSnakeFrame = props => {
  const {
    params: { height, width, cellSize },
  } = props;
  return (
    <CanvasFrame
      draw={draw}
      {...props}
      height={height * cellSize}
      width={width * cellSize}
    />
  );
};

export default withTheme(CanvasSnakeFrame);
