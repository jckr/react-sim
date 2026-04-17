import type { MazeData, MazeParams } from './mazeSim';
import { drawItemCircle, drawLinkCircle } from './mazeCircle';
import { drawItemHex, drawLinkHex } from './mazeHex';
import { drawItemSquare, drawLinkSquare } from './mazeSquare';
import { drawItemTriangle, drawLinkTriangle } from './mazeTriangle';

function fillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
}

export function drawMazeFrame(args: {
  ctx: CanvasRenderingContext2D;
  pixelWidth: number;
  pixelHeight: number;
  tick: number;
  params: MazeParams;
  data: MazeData;
}): void {
  const { ctx, pixelWidth, pixelHeight, tick, params, data } = args;
  const { drawItem, height, width, grid, ticksPerAnimation, wallColor, pathColor } = params;
  const { cells, links } = data;
  const cellSize = data.cellSize;
  const pathSize = data.pathSize;
  const wallSize = data.wallSize;

  const circle = (a: { x: number; y: number; r: number }) => {
    fillCircle(ctx, a.x, a.y, a.r);
  };

  if (tick === 0) {
    ctx.clearRect(0, 0, pixelWidth, pixelHeight);
    if (drawItem) {
      Object.values(cells).forEach((cell) => {
        drawCell({
          cell,
          circle,
          ctx,
          grid,
          height,
          width,
          wallColor,
          pathColor,
          pathSize,
          wallSize,
          cellSize
        });
      });
    } else {
      ctx.fillStyle = wallColor;
      ctx.fillRect(0, 0, pixelWidth, pixelHeight);
    }
  } else {
    for (let i = tick - ticksPerAnimation; i < tick; i++) {
      drawLink({
        cells,
        circle,
        ctx,
        grid,
        height,
        width,
        tick: i,
        link: links[i],
        pathColor,
        pathSize,
        wallSize,
        cellSize
      });
    }
  }
}

function drawCell(args: {
  cell: unknown;
  ctx: CanvasRenderingContext2D;
  grid: MazeParams['grid'];
  height: number;
  width: number;
  wallColor: string;
  pathColor: string;
  pathSize: number;
  wallSize: number;
  cellSize: number;
  circle: (a: { x: number; y: number; r: number }) => void;
}): void {
  const { cell, ctx, grid, height, width, wallColor, pathColor, pathSize, wallSize, cellSize, circle } = args;
  if (grid === 'circle') {
    drawItemCircle({
      cell: cell as Parameters<typeof drawItemCircle>[0]['cell'],
      circle,
      ctx,
      cellSize,
      pathColor,
      pathSize,
      wallColor,
      wallSize,
      height,
      width
    });
  }
  if (grid === 'hexagonal') {
    drawItemHex({ cell: cell as never, ctx, cellSize, wallColor, wallSize });
  }
  if (grid === 'square') {
    drawItemSquare({ cell: cell as never, ctx, cellSize, wallColor, wallSize });
  }
  if (grid === 'triangular') {
    drawItemTriangle({ cell: cell as never, ctx, cellSize, wallColor, wallSize });
  }
}

function drawLink(args: {
  cells: Record<string, unknown>;
  ctx: CanvasRenderingContext2D;
  grid: MazeParams['grid'];
  height: number;
  width: number;
  tick: number;
  link: [string, string] | undefined;
  pathColor: string;
  pathSize: number;
  wallSize: number;
  cellSize: number;
  circle: (a: { x: number; y: number; r: number }) => void;
}): void {
  const { cells, ctx, circle, grid, link, height, width, pathColor, pathSize, cellSize } = args;
  if (link === undefined) return;
  if (grid === 'square') {
    drawLinkSquare({ cells, ctx, circle, link, pathColor, pathSize, wallSize: args.wallSize, cellSize: args.cellSize });
  }
  if (grid === 'hexagonal') {
    drawLinkHex({ cells, ctx, circle, link, pathColor, pathSize, wallSize: args.wallSize, cellSize: args.cellSize });
  }
  if (grid === 'triangular') {
    drawLinkTriangle({ cells, ctx, circle, link, pathColor, pathSize, wallSize: args.wallSize, cellSize: args.cellSize });
  }
  if (grid === 'circle') {
    drawLinkCircle({ cells: cells as never, cellSize, ctx, circle, height, width, link, pathColor, pathSize });
  }
}
