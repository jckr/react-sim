import { P, P2, acuteArc, average, getRadius, isBetween } from './mazeGeomHelpers';

const segmentRatio = 3;

export type CircleCell = {
  id: string;
  layer: number;
  cell: number;
  startAngle: number;
  midAngle?: number;
  midangle?: number;
  endAngle: number;
  startAngleDeg?: number;
  endAngleDeg?: number;
  neighbors: string[];
};

export function initDataCircle(
  args: { height: number; width: number },
  random: () => number = Math.random
): {
  cells: Record<string, CircleCell>;
  cellSize: number;
  pathSize: number;
  wallSize: number;
  links: [string, string][];
  visited: Set<string>;
  stack: string[];
} {
  const { height, width } = args;
  const cellSize = Math.max(5, Math.min(10, Math.min(height, width) / 20));
  const pathSize = 0.6 * cellSize;
  const wallSize = 0.4 * cellSize;

  const layers = Math.floor(Math.min(height, width) / 2 / cellSize);
  const cells: Record<string, CircleCell> = {
    '0-0': {
      id: '0-0',
      layer: 0,
      cell: 0,
      startAngle: 0,
      midangle: P,
      endAngle: P2,
      neighbors: []
    }
  };
  let nbSegmentsPreviousLayer = 1;
  for (let l = 1; l < layers; l++) {
    const circumference = P2 * getRadius(l, cellSize);
    const nbSegments = Math.floor(circumference / (segmentRatio * cellSize));
    let runningAngle = (P2 * random()) / nbSegments;
    let previousLayerSegmentIdx = 0;
    let previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;

    while (
      !isBetween(runningAngle, cells[previousLayerSegmentId]!.startAngle, cells[previousLayerSegmentId]!.endAngle)
    ) {
      previousLayerSegmentIdx = (previousLayerSegmentIdx + 1) % nbSegmentsPreviousLayer;
      previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;
    }

    for (let s = 0; s < nbSegments; s++) {
      const endAngle = runningAngle + P2 / nbSegments;
      const midAngle = runningAngle + P2 / (nbSegments * segmentRatio);
      const id = `${l}-${s}`;

      const siblings =
        nbSegments === 2
          ? [`${l}-${(s + 1) % nbSegments}`]
          : [`${l}-${(nbSegments + s - 1) % nbSegments}`, `${l}-${(s + 1) % nbSegments}`];

      const cell: CircleCell = {
        id,
        layer: l,
        cell: s,
        startAngle: runningAngle,
        midAngle,
        endAngle,
        startAngleDeg: (runningAngle * 180) / P,
        endAngleDeg: (endAngle * 180) / P,
        neighbors: [...siblings]
      };

      if (isBetween(cells[previousLayerSegmentId]!.endAngle, midAngle, endAngle)) {
        cell.neighbors.push(previousLayerSegmentId);
        cells[previousLayerSegmentId]!.neighbors.push(id);
      }

      if (isBetween(cells[previousLayerSegmentId]!.endAngle, runningAngle, endAngle)) {
        previousLayerSegmentIdx = (previousLayerSegmentIdx + 1) % nbSegmentsPreviousLayer;
        previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;
        if (isBetween(cells[previousLayerSegmentId]!.endAngle, runningAngle, endAngle)) {
          cell.neighbors.push(previousLayerSegmentId);
          cells[previousLayerSegmentId]!.neighbors.push(id);
        }
      }

      cells[id] = cell;
      runningAngle = endAngle;
    }
    nbSegmentsPreviousLayer = nbSegments;
  }
  return {
    cells,
    cellSize,
    pathSize,
    wallSize,
    links: [],
    visited: new Set(['0-0']),
    stack: ['0-0']
  };
}

export function drawItemCircle(args: {
  cell: CircleCell;
  circle: (a: { x: number; y: number; r: number }) => void;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  pathColor: string;
  pathSize: number;
  wallColor: string;
  wallSize: number;
  height: number;
  width: number;
}): void {
  const { cell, circle, ctx, cellSize, pathColor, pathSize, wallColor, wallSize, height, width } = args;
  if (cell.layer === undefined) return;
  const [x, y] = [width / 2, height / 2];
  if (cell.id === '0-0') {
    ctx.fillStyle = pathColor;
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = wallSize;
    circle({ x, y, r: cellSize });
    ctx.fill();
    ctx.stroke();
    return;
  }
  const { layer } = cell;
  const circumference = P * getRadius(layer, cellSize);
  const wallAngleDelta = (P * wallSize) / 2 / circumference;
  ctx.strokeStyle = wallColor;
  ctx.lineWidth = cellSize;
  ctx.beginPath();
  acuteArc({
    ctx,
    x,
    y,
    r: getRadius(layer, cellSize),
    a0: cell.startAngle,
    a1: cell.endAngle
  });
  ctx.stroke();

  ctx.strokeStyle = pathColor;
  ctx.lineWidth = pathSize;
  ctx.beginPath();
  acuteArc({
    ctx,
    x,
    y,
    r: getRadius(layer, cellSize),
    a0: cell.startAngle + wallAngleDelta,
    a1: cell.endAngle - wallAngleDelta
  });
  ctx.stroke();
}

export function drawLinkCircle(args: {
  cells: Record<string, CircleCell>;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  circle: (a: { x: number; y: number; r: number }) => void;
  height: number;
  width: number;
  link: [string, string];
  pathColor: string;
  pathSize: number;
}): void {
  const { cells, cellSize, ctx, circle, height, width, link, pathColor, pathSize } = args;
  const start = cells[link[0]];
  if (!start) return;
  if (start.layer === 0) {
    drawLinkCircle({
      cells,
      cellSize,
      ctx,
      circle,
      height,
      width,
      link: [link[1], link[0]],
      pathColor,
      pathSize
    });
    return;
  }
  ctx.save();
  const end = cells[link[1]];
  if (!end) {
    ctx.restore();
    return;
  }
  const [x, y] = [width / 2, height / 2];
  ctx.strokeStyle = pathColor;
  ctx.fillStyle = pathColor;
  ctx.lineCap = 'round';
  ctx.lineWidth = pathSize;

  const startMidAngle = (start.startAngle + start.endAngle) / 2;

  if (end.layer === 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const x0 = x + Math.cos(startMidAngle) * getRadius(start.layer, cellSize);
    const y0 = y + Math.sin(startMidAngle) * getRadius(start.layer, cellSize);
    ctx.lineTo(x0, y0);
    ctx.stroke();
    ctx.beginPath();
    circle({ x, y, r: pathSize / 2 });
    ctx.fill();
    circle({ x: x0, y: y0, r: pathSize / 2 });
    ctx.fill();
    ctx.restore();
    return;
  }

  const endMidAngle = (end.startAngle + end.endAngle) / 2;

  if (start.layer === end.layer) {
    ctx.beginPath();
    const r = getRadius(start.layer, cellSize);
    acuteArc({ ctx, x, y, r, a0: startMidAngle, a1: endMidAngle });
    ctx.stroke();
    const x0 = x + Math.cos(startMidAngle) * r;
    const y0 = y + Math.sin(startMidAngle) * r;
    const x1 = x + Math.cos(endMidAngle) * r;
    const y1 = y + Math.sin(endMidAngle) * r;
    ctx.beginPath();
    circle({ x: x0, y: y0, r: pathSize / 2 });
    ctx.fill();
    circle({ x: x1, y: y1, r: pathSize / 2 });
    ctx.fill();
    ctx.restore();
    return;
  }

  const firstEnd =
    startMidAngle < endMidAngle
      ? { ...start, midAngle: startMidAngle }
      : { ...end, midAngle: endMidAngle };
  const secondEnd =
    startMidAngle < endMidAngle
      ? { ...end, midAngle: endMidAngle }
      : { ...start, midAngle: startMidAngle };
  const r0 = getRadius(firstEnd.layer, cellSize);
  const r1 = getRadius(secondEnd.layer, cellSize);

  const midAngle = isBetween(secondEnd.midAngle!, firstEnd.midAngle!, firstEnd.endAngle)
    ? average(firstEnd.midAngle!, secondEnd.midAngle!)
    : average(secondEnd.startAngle, firstEnd.endAngle);

  ctx.beginPath();
  acuteArc({ ctx, x, y, r: r0, a0: firstEnd.midAngle!, a1: midAngle });
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(midAngle) * r0, y + Math.sin(midAngle) * r0);
  ctx.lineTo(x + Math.cos(midAngle) * r1, y + Math.sin(midAngle) * r1);
  ctx.stroke();
  ctx.beginPath();
  acuteArc({ ctx, x, y, r: r1, a0: midAngle, a1: secondEnd.midAngle! });
  ctx.stroke();

  const x0 = x + Math.cos(firstEnd.midAngle!) * r0;
  const y0 = y + Math.sin(firstEnd.midAngle!) * r0;
  const x1 = x + Math.cos(secondEnd.midAngle!) * r1;
  const y1 = y + Math.sin(secondEnd.midAngle!) * r1;
  circle({ x: x0, y: y0, r: pathSize / 2 });
  ctx.fill();
  circle({ x: x1, y: y1, r: pathSize / 2 });
  ctx.fill();
  ctx.restore();
}
