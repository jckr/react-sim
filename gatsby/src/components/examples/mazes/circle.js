import { P, P2, isBetween, average, getRadius } from './helpers';

export const initDataCircle = (
  { cellSize, height, width },
  random = Math.random
) => {
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
    let previousLayerSegment = cells[previousLayerSegmentId];

    // in order to determine the neighbors of cells of this layer with
    // the cells in the previous layers, we start by looking for the
    // first cell in the previous layer which angles are across our
    // starting angle.

    // this cell will be a neighbor with the first cell of our new layer.

    while (
      !isBetween(
        runningAngle,
        previousLayerSegment.startAngle,
        previousLayerSegment.endAngle
      )
    ) {
      previousLayerSegmentIdx =
        (previousLayerSegmentIdx + 1) % nbSegmentsPreviousLayer;
      previousLayerSegmentId = `${l - 1}-${previousLayerSegmentIdx}`;
      previousLayerSegment = cells[previousLayerSegmentId];
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
        neighbors: [...siblings],
      };

      // next, we are trying to find the neighbors in the previous layer

      // the current previousLayerSegmentId is always a neighbor to this cell
      cell.neighbors.push(previousLayerSegmentId);
      cells[previousLayerSegmentId].neighbors.push(id);

      // now, is the next segment on the previous layer also a neighbor?
      if (isBetween(previousLayerSegment[1], runningAngle, endAngle)) {
        previousLayerSegmentIdx++;
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
    links: [],
    visited: new Set(['0-0']),
    currentCell: '0-0',
    stack: ['0-0'],
  };
};

const acuteArc = ({ ctx, x, y, r, a0, a1 }) => {
  // draws the smallest arc between angles a0 and a1;
  const angle0 = (a0 + Math.PI * 2) % (Math.PI * 2);
  const angle1 = (a1 + Math.PI * 2) % (Math.PI * 2);
  const startAngle = angle0 === 0 ? angle0 : Math.min(angle1, angle0);
  const endAngle = angle0 === 0 ? angle1 : Math.max(angle1, angle0);
  ctx.arc(x, y, r, -endAngle, -startAngle, endAngle - startAngle > P);
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
  const wallAngleDelta = (P * wallSize) / circumference;
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
  ctx.lineWidth = pathSize;

  const startMidAngle = (start.startAngle + start.endAngle) / 2;

  if (end.layer === 0) {
    ctx.strokeStyle = 'blue';
    // link to center
    ctx.beginPath();
    ctx.moveTo(x, y);
    const x0 = x + Math.cos(startMidAngle) * getRadius(start.layer, cellSize);
    const y0 = y + Math.sin(startMidAngle) * getRadius(start.layer, cellSize);
    ctx.lineTo(x0, y0);
    ctx.stroke();
    return;
  }

  const endMidAngle = (end.startAngle + end.endAngle) / 2;

  if (start.layer === end.layer) {
    ctx.strokeStyle = 'yellow';
    // link on same layer
    ctx.beginPath();
    acuteArc({
      ctx,
      x,
      y,
      r: getRadius(start.layer, cellSize),
      a0: startMidAngle,
      a1: endMidAngle,
    });
    ctx.stroke();
    return;
  }

  // general case - link on different layers
  ctx.strokeStyle = 'red';
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
  debugger;

  ctx.beginPath();
  acuteArc({ ctx, x, y, r: r0, a0: firstEnd.midAngle, a1: midAngle });
  ctx.stroke();
  ctx.moveTo(x + Math.cos(midAngle) * r0, y + Math.sin(midAngle) * r0);
  ctx.lineTo(x + Math.cos(midAngle) * r1, y + Math.sin(midAngle) * r1);
  ctx.stroke();
  acuteArc({ ctx, x, y, r: r1, a0: midAngle, a1: secondEnd.midAngle });
  ctx.stroke();

  return;
};
