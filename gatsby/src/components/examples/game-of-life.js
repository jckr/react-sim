import React from 'react';
import { Grid } from 'react-sim';

import Model from './framed-model';

// helpers

function countNeighbors(x, y, grid) {
  const height = grid.length;
  if (!height) {
    return 0;
  }
  const width = grid[0].length;

  let n = 0;
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const x1 = x + xOffset;
      const y1 = y + yOffset;
      if (
        x1 < width &&
        x1 > 0 &&
        y1 < height &&
        y1 > 0 &&
        (x1 !== x || y1 !== y)
      ) {
        n += grid[y1][x1];
      }
    }
  }
  return n;
}

export function updateGameOfLifeGrid({ data, complete }) {
  let changes = 0;
  const updatedGrid = data.map((row, y) =>
    row.map((cell, x) => {
      const neighbors = countNeighbors(x, y, data);
      if (cell && (neighbors < 2 || neighbors > 3)) {
        // living cell has too few or too many neighbors, and dies.
        changes++;
        return 0;
      }
      if (!cell && neighbors === 3) {
        // dead cell has the right amount of neighbors, and lives!
        changes++;
        return 1;
      }
      // no change
      return cell;
    })
  );
  if (changes === 0) {
    complete();
  }
  return updatedGrid;
}

export function updateGridNoComplete({ data }) {
  return data.map((row, y) =>
    row.map((cell, x) => {
      const neighbors = countNeighbors(x, y, data);
      if (cell && (neighbors < 2 || neighbors > 3)) {
        // living cell has too few or too many neighbors, and dies.
        return 0;
      }
      if (!cell && neighbors === 3) {
        // dead cell has the right amount of neighbors, and lives!
        return 1;
      }
      // no change
      return cell;
    })
  );
}

export function initGrid({ height, width, density }, random = Math.random) {
  return Array(height)
    .fill(0)
    .map(row =>
      Array(width)
        .fill(0)
        .map(() => Number(random() < density))
    );
}

const GameOfLife = () => (
  <Model
    auto={false}
    controls={{
      param: 'density',
      maxValue: 1,
      step: 0.01,
      resetOnChange: true,
      label: 'Grid density',
    }}
    showTimeSlider={false}
    updateData={updateGameOfLifeGrid}
    delay={100}
    initData={initGrid}
    initialParams={{
      height: 28,
      width: 28,
      density: 0.15,
    }}
  >
    <Grid />
  </Model>
);

export const Step2 = () => (
  <Model
    initData={initGrid}
    initialParams={{
      height: 10,
      width: 10,
      density: 0.15,
    }}
  >
    <Grid />
  </Model>
);

export const Step3 = () => (
  <Model
    initData={initGrid}
    updateData={updateGridNoComplete}
    initialParams={{
      height: 10,
      width: 10,
      density: 0.15,
    }}
  >
    <Grid />
  </Model>
);

export const Step4 = () => (
  <Model
    initData={initGrid}
    updateData={updateGameOfLifeGrid}
    initialParams={{
      height: 10,
      width: 10,
      density: 0.15,
    }}
  >
    <Grid />
  </Model>
);

export const Step5 = () => (
  <Model
    controls={{
      param: 'density',
      resetOnChange: true,
      maxValue: 1,
      step: 0.01,
      label: 'Grid density',
    }}
    showTimeSlider={false}
    initData={initGrid}
    updateData={updateGameOfLifeGrid}
    initialParams={{
      height: 24,
      width: 48,
      density: 0.15,
    }}
  >
    <Grid />
  </Model>
);

export default GameOfLife;
