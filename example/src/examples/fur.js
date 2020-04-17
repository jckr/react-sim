import React from "react";
import { FlexRow, FlexColumn, Model } from "react-sim";
import { GameOfLifeFrame } from "./game-of-life";

// helpers

function getTotalValue(grid, listOfCells) {
  return listOfCells.reduce((total, [x, y]) => total + grid[y][x].value, 0);
}

export function updateFur({ data, tick, params, pause }) {
  let grid = JSON.parse(JSON.stringify(data));
  let changes = 0;
  const { height, width, w } = params;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const {innerNeighbors, outerNeighbors} = data[row][col];

      const activators = getTotalValue(data, innerNeighbors);
      const inhibitors = getTotalValue(data, outerNeighbors);

      const mutation = activators - w * inhibitors;

      if (mutation > 0) {
        grid[row][col].value = 1;
      }
      if (mutation < 0) {
        grid[row][col].value = 0;
      }
      if (grid[row][col] !== data[row][col]) {
        changes++;
      }

      // if mutation = 0, leave cell unchanged
    }
  }
  if (changes < 5) {
    pause();
  }
  return grid;
}

function initData({ height, width, density, innerRadius, outerRadius}) {
  const data = [];
  for (let row = 0; row < height; row++) {
    const cells = [];
    for (let col = 0; col < width; col++) {
      const innerNeighbors = [];
      const outerNeighbors = [];

      const x0 = Math.max(col - outerRadius, 0);
      const x1 = Math.min(col + outerRadius, width - 1);
      const y0 = Math.max(row - outerRadius, 0);
      const y1 = Math.min(row + outerRadius, height - 1);

      for (let x = x0; x < x1; x++) {
        for (let y = y0; y < y1; y++) {
          const dist = Math.hypot(col - x, row - y);
          if (dist > innerRadius && dist <= outerRadius) {
            outerNeighbors.push([x, y]);
          } else {
            if (dist > 0 && dist <= innerRadius) {
              innerNeighbors.push([x, y]);
            }
          }
        }
      }

      const value = Math.random() < density;

      cells.push({value, innerNeighbors, outerNeighbors});
    }
    data.push(cells);
  }
  return data;
}

const Fur = () => (
  <Model
    auto="false"
    initData={initData}
    initialParams={{
      height: 100,
      width: 100,
      density: 0.5,
      innerRadius: 3,
      outerRadius: 6,
      w: 0.35
    }}
    updateData={updateFur}
    maxTime={200}
  >
    <GameOfLifeFrame size={6} accessor={d => d.value} />
  </Model>
);

export default Fur;
