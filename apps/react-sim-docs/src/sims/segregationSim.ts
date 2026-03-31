import type { SimulationModule } from 'react-sim-engine/runner/module-types';
import type { UpdateResult } from 'react-sim-engine/types';

export type Cell = {
  community: number;
  isHappy?: number;
  prevX?: number;
  prevY?: number;
};

export type SegData = {
  grid: Cell[][];
  happy: number;
  happiness: number;
  totalMoves: number;
};

export type SegParams = {
  cols: number;
  rows: number;
  height: number;
  width: number;
  tolerance: number;
  proportion: number;
  showmoves: boolean;
  threshold: number;
};

export const defaultParams: SegParams = {
  cols: 20,
  rows: 20,
  height: 330,
  width: 330,
  tolerance: 60,
  proportion: 50,
  showmoves: true,
  threshold: 99
};

function isInBounds(grid: Cell[][], x: number, y: number): boolean {
  if (!grid.length) return false;
  const height = grid.length;
  if (y < 0 || y >= height) return false;
  const width = grid[0].length;
  if (x < 0 || x >= width) return false;
  return true;
}

function countNeighbors(grid: Cell[][], x: number, y: number): number {
  const { community } = grid[y][x];
  return (
    [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ] as const
  ).reduce((neighborsOfSameCommunity, [dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (isInBounds(grid, nx, ny) && grid[ny][nx].community === community) {
      return neighborsOfSameCommunity + 1;
    }
    return neighborsOfSameCommunity;
  }, 0);
}

function getPotentialNeighbors(grid: Cell[][], x: number, y: number): number {
  const height = grid.length;
  const width = grid[0].length;
  const onXBorder = x === 0 || x === width - 1;
  const onYBorder = y === 0 || y === height - 1;
  return onXBorder ? (onYBorder ? 3 : 5) : onYBorder ? 5 : 8;
}

function isHappy(grid: Cell[][], x: number, y: number, tolerance: number): boolean {
  const potentialNeighbors = getPotentialNeighbors(grid, x, y);
  const differentNeighbors = potentialNeighbors - countNeighbors(grid, x, y);
  return differentNeighbors / potentialNeighbors < tolerance / 100;
}

function countHappiness(grid: Cell[][], tolerance: number): number {
  return grid.reduce(
    (total, row, y) => row.reduce((rowTotal, _cell, x) => rowTotal + (isHappy(grid, x, y, tolerance) ? 1 : 0), total),
    0
  );
}

export function initData(params: SegParams): SegData {
  const { cols, rows, proportion, tolerance } = params;
  const grid: Cell[][] = Array(rows)
    .fill(0)
    .map(() =>
      Array(cols)
        .fill(0)
        .map(() => ({ community: 100 * Math.random() > proportion ? 1 : 0 }))
    );
  grid.forEach((row, y) =>
    row.forEach((_cell, x) => {
      grid[y][x].isHappy = isHappy(grid, x, y, tolerance) ? 1 : 0;
    })
  );
  const happy = countHappiness(grid, tolerance);
  return { grid, happy, happiness: happy / (cols * rows), totalMoves: 0 };
}

export function updateData(_args: {
  data: SegData;
  params: SegParams;
  tick: number;
  cachedData: Record<number, SegData>;
}): UpdateResult<SegData> {
  const { data, params } = _args;
  const { cols, threshold, tolerance } = params;
  let movers: [number, number][] = [];
  let happy = 0;
  let updatedTotalMoves = data.totalMoves;
  const updatedGrid: Cell[][] = JSON.parse(JSON.stringify(data.grid)) as Cell[][];

  updatedGrid.forEach((row, y) =>
    row.forEach((cell, x) => {
      cell.prevX = x;
      cell.prevY = y;
      if (isHappy(updatedGrid, x, y, tolerance)) {
        happy++;
        cell.isHappy = 1;
      } else {
        cell.isHappy = 0;
        movers.push([x, y]);
      }
    })
  );

  const next: SegData = {
    grid: updatedGrid,
    totalMoves: updatedTotalMoves,
    happy,
    happiness: happy / (cols * params.rows)
  };

  if (happy > (cols * params.rows * threshold) / 100) {
    return { status: 'complete', data: next };
  }

  while (movers.length > 1) {
    const first = movers.shift()!;
    const idx = Math.floor(Math.random() * movers.length);
    const second = movers[idx];

    const tmp = { ...updatedGrid[first[1]][first[0]] };
    updatedGrid[first[1]][first[0]] = { ...updatedGrid[second[1]][second[0]] };
    updatedGrid[second[1]][second[0]] = tmp;

    updatedTotalMoves += 2;
    movers = movers.slice(0, idx).concat(movers.slice(idx + 1));
  }

  next.totalMoves = updatedTotalMoves;
  return { status: 'continue', data: next };
}

function circle(
  ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
  args: { x: number; y: number; r: number }
) {
  ctx.beginPath();
  ctx.arc(args.x, args.y, args.r, 0, Math.PI * 2);
  ctx.closePath();
}

export function draw({
  ctx,
  snapshot
}: {
  ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
  snapshot: { data: SegData; params: SegParams };
}) {
  const { height, width, rows, cols, showmoves } = snapshot.params;
  const canvas = ctx.canvas;
  if ('width' in canvas && canvas.width !== width) canvas.width = width;
  if ('height' in canvas && canvas.height !== height) canvas.height = height;

  const sx = height / rows;
  const sy = width / cols;
  const size = 0.8 * Math.min(sx, sy);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 1;

  snapshot.data.grid.forEach((row, r) =>
    row.forEach((citizen, c) => {
      if (citizen.community === 0) {
        ctx.fillStyle = '#33e';
        circle(ctx, { x: (c + 0.5) * sx, y: (r + 0.5) * sy, r: size / 2 });
        citizen.isHappy ? ctx.fill() : ctx.stroke();
      } else {
        ctx.fillStyle = '#a0c';
        const x = (c + 0.5) * sx - size / 2;
        const y = (r + 0.5) * sy - size / 2;
        citizen.isHappy ? ctx.fillRect(x, y, size, size) : ctx.strokeRect(x, y, size, size);
      }
    })
  );

  if (showmoves) {
    ctx.strokeStyle = '#222';
    ctx.fillStyle = '#222';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;

    snapshot.data.grid.forEach((row, r) => {
      row.forEach((citizen, c) => {
        const { prevX, prevY } = citizen;
        if (prevX === undefined || prevY === undefined) return;
        if (prevX === c && prevY === r) return;

        const x0 = sx * (prevX + 0.5);
        const x1 = sx * (c + 0.5);
        const y0 = sy * (prevY + 0.5);
        const y1 = sy * (r + 0.5);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();

        circle(ctx, { x: x0, y: y0, r: size / 4 });
        ctx.fill();
        circle(ctx, { x: x1, y: y1, r: size / 4 });
        ctx.fill();
      });
    });
  }

  if ('commit' in ctx && typeof ctx.commit === 'function') {
    ctx.commit();
  }
}

export const module: SimulationModule<SegData, SegParams, unknown> = {
  initData,
  updateData,
  draw,
  defaultParams
};
