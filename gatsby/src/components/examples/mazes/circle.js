import { P, P2, acuteArc, isBetween, average, getRadius } from './helpers';
import { CETR2 } from '../../constants';

export const initDataCircle = ({ height, width }, random = Math.random) => {
  const cellSize = Math.max(5, Math.min(10, Math.min(height, width) / 20));
  const pathSize = 0.8 * cellSize;
  const wallSize = 0.1 * cellSize;

  const layers = Math.floor(Math.min(height, width) / 2 / cellSize);
  const cells = {
    '0-0': {
      id: '0-0',
      layer: 0,
      cell: 0,
      startAngle: 0,
      endAngle: P2,
      neighbors: [],
    },
  };
  let nbSegmentsPreviousLayer = 1;
  for (let l = 1; l < layers; l++) {
    const circumference = P * getRadius(l, cellSize);
    const nbSegments = Math.floor(circumference / cellSize);
    let runningAngle = (P2 * random()) / nbSegments;
    let previousLayerSegmentIdx = 0;
    let previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;

    // in order to determine the neighbors of cells of this layer with
    // the cells in the previous layers, we start by looking for the
    // first cell in the previous layer which angles are across our
    // starting angle.

    // this cell will be a neighbor with the first cell of our new layer.

    while (
      !isBetween(
        runningAngle,
        cells[previousLayerSegmentId].startAngle,
        cells[previousLayerSegmentId].endAngle
      )
    ) {
      previousLayerSegmentIdx =
        (previousLayerSegmentIdx + 1) % nbSegmentsPreviousLayer;
      previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;
    }

    for (let s = 0; s < nbSegments; s++) {
      const endAngle = runningAngle + P2 / nbSegments;
      const id = `${l}-${s}`;
      // siblings are cells on the same layer of the current segment.
      // they are always neighbors to the current cell.

      const siblings =
        nbSegments === 2
          ? [`${l}-${(s + 1) % nbSegments}`]
          : [
              `${l}-${(nbSegments + s - 1) % nbSegments}`,
              `${l}-${(s + 1) % nbSegments}`,
            ];
      const cell = {
        id,
        layer: l,
        cell: s,
        startAngle: runningAngle,
        endAngle,
        startAngleDeg: (runningAngle * 180) / P,
        endAngleDeg: (endAngle * 180) / P,
        neighbors: [...siblings],
      };

      // next, we are trying to find the neighbors in the previous layer
      // the current previousLayerSegmentId is always a neighbor to this cell
      cell.neighbors.push(previousLayerSegmentId);
      cells[previousLayerSegmentId].neighbors.push(id);

      // now, is the next segment on the previous layer also a neighbor?
      if (
        isBetween(
          cells[previousLayerSegmentId].endAngle,
          runningAngle,
          endAngle
        )
      ) {
        previousLayerSegmentIdx =
          (previousLayerSegmentIdx + 1) % nbSegmentsPreviousLayer;
        previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;
        cell.neighbors.push(previousLayerSegmentId);
        cells[previousLayerSegmentId].neighbors.push(id);
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
    currentCell: '0-0',
    stack: ['0-0'],
  };
};

export const drawItemCircle = ({
  cell,
  circle,
  ctx,
  cellSize,
  pathColor,
  pathSize,
  wallColor,
  wallSize,
  height,
  width,
}) => {
  if (cell.layer === undefined) {
    return;
  }
  const [x, y] = [width / 2, height / 2];
  if (cell.id === '0-0') {
    // inner circle
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
    a1: cell.endAngle,
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
    a1: cell.endAngle - wallAngleDelta,
  });
  ctx.stroke();
};
export const drawStraightLinkCircle = ({
  cells,
  cellSize,
  ctx,
  circle,
  height,
  width,
  link,
  pathColor,
  pathSize,
  wallColor,
  tick,
}) => {
  const start = cells[link[0]];
  const end = cells[link[1]];
  const [x, y] = [width / 2, height / 2];
  ctx.strokeStyle = wallColor;
  ctx.fillStyle = wallColor;

  ctx.strokeStyle = CETR2[tick % 256];
  ctx.fillStyle = CETR2[tick % 256];
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.5;

  const startMidAngle = (start.startAngle + start.endAngle) / 2;
  const endMidAngle = (end.startAngle + end.endAngle) / 2;

  const x0 = x + Math.cos(startMidAngle) * getRadius(start.layer, cellSize);
  const y0 = y + Math.sin(startMidAngle) * getRadius(start.layer, cellSize);

  const x1 = x + Math.cos(endMidAngle) * getRadius(end.layer, cellSize);
  const y1 = y + Math.sin(endMidAngle) * getRadius(end.layer, cellSize);

  circle({ x: x0, y: y0, r: 2 });
  ctx.fill();
  circle({ x: x1, y: y1, r: 2 });
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.globalAlpha = 1;
};

export const drawLinkCircle = ({
  cells,
  cellSize,
  ctx,
  circle,
  height,
  width,
  link,
  pathColor,
  pathSize,
}) => {
  const start = cells[link[0]];
  if (start.layer === 0) {
    // link from center
    return drawLinkCircle({
      cells,
      cellSize,
      ctx,
      circle,
      height,
      width,
      link: [link[1], link[0]],
      pathColor,
      pathSize,
    });
  }

  const end = cells[link[1]];
  const [x, y] = [width / 2, height / 2];
  ctx.strokeStyle = pathColor;
  ctx.fillStyle = pathColor;

  ctx.lineWidth = pathSize;

  const startMidAngle = (start.startAngle + start.endAngle) / 2;

  if (end.layer === 0) {
    // link to center
    ctx.beginPath();
    ctx.moveTo(x, y);
    const x0 = x + Math.cos(startMidAngle) * getRadius(start.layer, cellSize);
    const y0 = y + Math.sin(startMidAngle) * getRadius(start.layer, cellSize);
    ctx.lineTo(x0, y0);
    ctx.stroke();
    circle({ x, y, r: pathSize / 2 });
    ctx.fill();
    circle({ x: x0, y: y0, r: pathSize / 2 });
    ctx.fill();
    return;
  }

  const endMidAngle = (end.startAngle + end.endAngle) / 2;

  if (start.layer === end.layer) {
    // link on same layer
    ctx.beginPath();
    const r = getRadius(start.layer, cellSize);
    acuteArc({
      ctx,
      x,
      y,
      r,
      a0: startMidAngle,
      a1: endMidAngle,
    });
    ctx.stroke();
    const x0 = x + Math.cos(startMidAngle) * r;
    const y0 = y + Math.sin(startMidAngle) * r;

    const x1 = x + Math.cos(endMidAngle) * r;
    const y1 = y + Math.sin(endMidAngle) * r;

    circle({ x: x0, y: y0, r: pathSize / 2 });
    ctx.fill();
    circle({ x: x1, y: y1, r: pathSize / 2 });
    ctx.fill();

    return;
  }

  // general case - link on different layers
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

  const midAngle = isBetween(
    secondEnd.midAngle,
    firstEnd.midAngle,
    firstEnd.endAngle
  )
    ? average(firstEnd.midAngle, secondEnd.midAngle)
    : average(secondEnd.startAngle, firstEnd.endAngle);

  ctx.beginPath();
  acuteArc({ ctx, x, y, r: r0, a0: firstEnd.midAngle, a1: midAngle });
  ctx.stroke();
  ctx.moveTo(x + Math.cos(midAngle) * r0, y + Math.sin(midAngle) * r0);
  ctx.lineTo(x + Math.cos(midAngle) * r1, y + Math.sin(midAngle) * r1);
  ctx.stroke();
  acuteArc({ ctx, x, y, r: r1, a0: midAngle, a1: secondEnd.midAngle });
  ctx.stroke();

  const x0 = x + Math.cos(firstEnd.midAngle) * r0;
  const y0 = y + Math.sin(firstEnd.midAngle) * r0;

  const x1 = x + Math.cos(secondEnd.midAngle) * r1;
  const y1 = y + Math.sin(secondEnd.midAngle) * r1;

  circle({ x: x0, y: y0, r: pathSize / 2 });
  ctx.fill();
  circle({ x: x1, y: y1, r: pathSize / 2 });
  ctx.fill();

  return;
};
