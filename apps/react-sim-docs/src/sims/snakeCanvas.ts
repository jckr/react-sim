/** Main-thread canvas drawing for the snake demo (legacy react-sim behavior, fixed palette). */

import { DOWN, LEFT, RIGHT, UP } from './snakeHelpers';

const snakeToCellRatio = 0.8;

const COLORS = {
  primary: '#0b57d0',
  secondary: '#5c6bc0',
  accent: '#2e7d32',
  gray: '#ccc'
};

function fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawActionGrid(args: {
  actionGrid: (number | undefined)[][];
  cellSize: number;
  considered: readonly (readonly [number, number])[] | undefined;
  ctx: CanvasRenderingContext2D;
  strokeStyle: string;
}): void {
  const { actionGrid, cellSize, considered, ctx, strokeStyle } = args;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1;

  function horizontal(r: number, c: number): void {
    ctx.beginPath();
    ctx.moveTo(c * cellSize, (r + 0.5) * cellSize);
    ctx.lineTo((c + 1) * cellSize, (r + 0.5) * cellSize);
    ctx.stroke();
  }
  function vertical(r: number, c: number): void {
    ctx.beginPath();
    ctx.moveTo((c + 0.5) * cellSize, r * cellSize);
    ctx.lineTo((c + 0.5) * cellSize, (r + 1) * cellSize);
    ctx.stroke();
  }
  function topLeft(r: number, c: number): void {
    ctx.beginPath();
    ctx.arc(c * cellSize, r * cellSize, cellSize / 2, 0, Math.PI / 2, false);
    ctx.stroke();
  }
  function topRight(r: number, c: number): void {
    ctx.beginPath();
    ctx.arc((c + 1) * cellSize, r * cellSize, cellSize / 2, Math.PI / 2, Math.PI, false);
    ctx.stroke();
  }
  function bottomLeft(r: number, c: number): void {
    ctx.beginPath();
    ctx.arc(c * cellSize, (r + 1) * cellSize, cellSize / 2, -Math.PI / 2, 0, false);
    ctx.stroke();
  }
  function bottomRight(r: number, c: number): void {
    ctx.beginPath();
    ctx.arc((c + 1) * cellSize, (r + 1) * cellSize, cellSize / 2, Math.PI, -Math.PI / 2, false);
    ctx.stroke();
  }

  if (considered) {
    ctx.strokeStyle = strokeStyle;
    for (const [x, y] of considered) {
      ctx.beginPath();
      ctx.arc((x + 0.5) * cellSize, (y + 0.5) * cellSize, cellSize / 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  actionGrid.forEach((row, r) => {
    row.forEach((action, c) => {
      switch (action) {
        case UP:
          if (c > 0 && actionGrid[r]![c - 1] === RIGHT) topLeft(r, c);
          else if (actionGrid[r]![c + 1] === LEFT) topRight(r, c);
          else vertical(r, c);
          break;
        case DOWN:
          if (c > 0 && actionGrid[r]![c - 1] === RIGHT) bottomLeft(r, c);
          else if (actionGrid[r]![c + 1] === LEFT) bottomRight(r, c);
          else vertical(r, c);
          break;
        case RIGHT:
          if (r > 0 && actionGrid[r - 1]![c] === DOWN) topRight(r, c);
          else if (actionGrid[r + 1]?.[c] === UP) bottomRight(r, c);
          else horizontal(r, c);
          break;
        case LEFT:
          if (r > 0 && actionGrid[r - 1]![c] === DOWN) topLeft(r, c);
          else if (actionGrid[r + 1]?.[c] === UP) bottomLeft(r, c);
          else horizontal(r, c);
          break;
        default:
          break;
      }
    });
  });
}

export function drawSnakeFrame(args: {
  ctx: CanvasRenderingContext2D;
  pixelWidth: number;
  pixelHeight: number;
  cellSize: number;
  cols: number;
  rows: number;
  displayGrid: boolean;
  displayCircuit: boolean;
  displayHead: boolean;
  data: {
    actionGrid: (number | undefined)[][];
    bestPath: boolean;
    direction: number;
    fruit: [number, number] | null;
    snakePath: [number, number][];
  };
}): void {
  const { ctx, pixelWidth, pixelHeight, cellSize, cols, rows, displayGrid, displayCircuit, displayHead, data } = args;
  const { actionGrid, bestPath, direction, fruit, snakePath } = data;

  ctx.clearRect(0, 0, pixelWidth, pixelHeight);

  if (displayGrid) {
    ctx.strokeStyle = COLORS.gray;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }

  if (displayCircuit) {
    drawActionGrid({
      actionGrid,
      cellSize,
      considered: undefined,
      ctx,
      strokeStyle: bestPath ? COLORS.accent : COLORS.secondary
    });
  }

  if (fruit) {
    ctx.fillStyle = COLORS.secondary;
    ctx.fillRect((fruit[0] + 0.2) * cellSize, (fruit[1] + 0.2) * cellSize, 0.6 * cellSize, 0.6 * cellSize);
  }

  snakePath.forEach((coords, i) => {
    const next = snakePath[i + 1];
    const [c0, r0] = coords;
    ctx.fillStyle = COLORS.primary;
    if (next) {
      const [c1, r1] = next;
      const x = cellSize * (Math.min(c1, c0) + (1 - snakeToCellRatio) / 2);
      const y = cellSize * (Math.min(r1, r0) + (1 - snakeToCellRatio) / 2);
      const w = cellSize * (c0 === c1 ? snakeToCellRatio : 2 - (1 - snakeToCellRatio));
      const h = cellSize * (r0 === r1 ? snakeToCellRatio : 2 - (1 - snakeToCellRatio));
      roundRect(ctx, x, y, w, h, cellSize / 2);
      ctx.fill();
    } else if (displayHead) {
      const x = (c0 + 0.5) * cellSize;
      const y = (r0 + 0.5) * cellSize;
      const r = (cellSize * snakeToCellRatio) / 2;
      ctx.fillStyle = COLORS.primary;
      fillCircle(ctx, x, y, r);
      ctx.fillStyle = '#fff';
      switch (direction) {
        case UP:
          fillCircle(ctx, x - 0.5 * r, y - 0.5 * r, 2);
          fillCircle(ctx, x + 0.5 * r, y - 0.5 * r, 2);
          break;
        case DOWN:
          fillCircle(ctx, x - 0.5 * r, y + 0.5 * r, 2);
          fillCircle(ctx, x + 0.5 * r, y + 0.5 * r, 2);
          break;
        case LEFT:
          fillCircle(ctx, x - 0.5 * r, y - 0.5 * r, 2);
          fillCircle(ctx, x - 0.5 * r, y + 0.5 * r, 2);
          break;
        case RIGHT:
          fillCircle(ctx, x + 0.5 * r, y - 0.5 * r, 2);
          fillCircle(ctx, x + 0.5 * r, y + 0.5 * r, 2);
          break;
        default:
          break;
      }
    }
  });
}
