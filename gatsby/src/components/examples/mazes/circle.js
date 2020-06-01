import { P, P2, isBetween } from './helpers';

export const initDataCircle = (
  { cellSize, height, width },
  random = Math.random
) => {
  const layers = Math.floor(Math.min(height, width) / cellSize);
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
    const circumference = (l + 0.5) * P * cellSize;
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

export const getCoordsCircle = ({ cell, cellSize, wallSize }) => {};

export const drawCellCircle = ({
  cell,
  ctx,
  cellSize,
  wallColor,
  wallSize,
}) => {};

export const drawLinkCircle = ({
  cells,
  ctx,
  circle,
  link,
  pathColor,
  pathSize,
}) => {};
