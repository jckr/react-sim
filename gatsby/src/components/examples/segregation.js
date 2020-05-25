import React from 'react';
import { CanvasFrame, Counter, TimeSeries } from 'react-sim';
import { Flex } from 'rebass';

import Model from './framed-model';


export const initData = (params, random = Math.random) => {
  const { cols, rows, proportion, tolerance } = params;
  const grid = Array(rows)
    .fill(0)
    .map(row =>
      Array(cols)
        .fill(0)
        .map(col => ({ community: 100 * random() > proportion ? 1 : 0 }))
    );
  grid.forEach((row, y) =>
    row.forEach((citizen, x) => {
      citizen.isHappy = isHappy(grid, x, y, tolerance);
    })
  );
  const happy = countHappiness(grid, tolerance);
  const happiness = happy / (cols * rows);
  return { grid, happy, happiness, totalMoves: 0 };
};

export function countNeighbors(grid, x, y) {
  const { community } = grid[y][x];
  return [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ].reduce((neighborsOfSameCommunity, offset) => {
    const neighborX = x + offset[0];
    const neighborY = y + offset[1];
    if (isInBounds(grid, neighborX, neighborY)) {
      const neighbor = grid[neighborY][neighborX];
      if (neighbor.community === community) {
        neighborsOfSameCommunity = neighborsOfSameCommunity + 1;
      }
    }
    return neighborsOfSameCommunity;
  }, 0);
}

export function isInBounds(grid, x, y) {
  if (!grid) {
    return false;
  }
  const height = grid.length;
  if (y < 0 || y >= height) {
    return false;
  }
  const width = grid[0].length;
  if (x < 0 || x >= width) {
    return false;
  }
  return true;
}

export function getPotentialNeighbors(grid, x, y) {
  const height = grid.length;
  const width = grid[0].length;
  const onXBorder = x === 0 || x === width - 1;
  const onYBorder = y === 0 || y === height - 1;

  return onXBorder ? (onYBorder ? 3 : 5) : onYBorder ? 5 : 8;
}

export function isHappy(grid, x, y, tolerance) {
  const potentialNeighbors = getPotentialNeighbors(grid, x, y);
  const differentNeighbors = potentialNeighbors - countNeighbors(grid, x, y);
  return differentNeighbors / potentialNeighbors < tolerance / 100;
}

export function countHappiness(grid, tolerance) {
  return grid.reduce(
    (totalHappiness, row, y) =>
      row.reduce((rowHappiness, cell, x) => {
        return rowHappiness + isHappy(grid, x, y, tolerance);
      }, totalHappiness),
    0
  );
}

export const updateData = (
  { data, params, complete },
  random = Math.random
) => {
  const { cols, rows, threshold, tolerance } = params;
  let movers = [];
  let happy = 0;
  let updatedTotalMoves = data.totalMoves;
  let updatedGrid = JSON.parse(JSON.stringify(data.grid));
  updatedGrid.forEach((row, y) =>
    row.forEach((cell, x) => {
      cell.prevX = x;
      cell.prevY = y;
      if (isHappy(updatedGrid, x, y, tolerance)) {
        happy = happy + 1;
        cell.isHappy = 1;
      } else {
        cell.isHappy = 0;
        movers.push([x, y]);
      }
    })
  );
  if (happy > (cols * rows * threshold) / 100) {
    complete();
  }
  // we only swap citizens if there are more than 2 willing to swap
  while (movers.length > 1) {
    // first to move is head of the queue
    const firstUnhappyCitizen = movers.shift();
    // second to move is randomly chosen in the queue
    const randomUnhappyCitizenNumber = Math.floor(random() * movers.length);

    const secondUnhappyCitizen = movers[randomUnhappyCitizenNumber];

    // we swap them in grid

    const temp = {
      ...updatedGrid[firstUnhappyCitizen[1]][firstUnhappyCitizen[0]],
    };
    updatedGrid[firstUnhappyCitizen[1]][firstUnhappyCitizen[0]] = {
      ...updatedGrid[secondUnhappyCitizen[1]][secondUnhappyCitizen[0]],
    };
    updatedGrid[secondUnhappyCitizen[1]][secondUnhappyCitizen[0]] = temp;

    updatedTotalMoves = updatedTotalMoves + 2;

    // we remove the second citizen from movers

    movers = movers
      .slice(0, randomUnhappyCitizenNumber)
      .concat(movers.slice(randomUnhappyCitizenNumber + 1));
  }
  return {
    grid: updatedGrid,
    totalMoves: updatedTotalMoves,
    happy,
    happiness: happy / (cols * rows),
  };
};
export const draw = ({ ctx, data, params, circle }) => {
  const { height, width, rows, cols, showmoves } = params;
  const sx = height / rows;
  const sy = width / cols;
  const size = 0.8 * Math.min(sx, sy);
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 1;
  data.grid.forEach((row, r) =>
    row.forEach((citizen, c) => {
      if (citizen.community === 0) {
        ctx.fillStyle = '#33e';
        circle({ x: (c + 0.5) * sx, y: (r + 0.5) * sy, r: size / 2 });
        if (citizen.isHappy) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#a0c';
        const x = (c + 0.5) * sx - size / 2;
        const y = (r + 0.5) * sy - size / 2;
        if (citizen.isHappy) {
          ctx.fillRect(x, y, size, size);
        } else {
          ctx.strokeRect(x, y, size, size);
        }
      }
    })
  );
  if (showmoves) {
    ctx.strokeStyle = '#222';
    ctx.fillStyle = '#222';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    data.grid.forEach((row, r) => {
      row.forEach((citizen, c) => {
        if (citizen.prevX !== undefined) {
          const { prevX, prevY } = citizen;
          if (prevX !== c || prevY !== r) {
            // citizen has moved

            const x0 = sx * (prevX + 0.5);
            const x1 = sx * (c + 0.5);

            const y0 = sy * (prevY + 0.5);
            const y1 = sy * (r + 0.5);

            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            circle({ x: x0, y: y0, r: size / 4 });
            ctx.fill();
            circle({ x: x1, y: y1, r: size / 4 });
            ctx.fill();
          }
        }
      });
    });
  }
};

export const Frame = props => <CanvasFrame draw={draw} {...props} />;

const series = {
  label: 'Happiness',
  accessor: d => d.happy,
};

const counterSeries = [
  {
    label: 'Happiness',
    accessor: d => `${Math.floor(1000 * Number(d.happiness.toFixed(3))) / 10}%`,
  },
  { label: 'Total moves', accessor: d => d.totalMoves },
];

export const params = {
  cols: 20,
  rows: 20,
  height: 330,
  width: 330,
  tolerance: 60,
  proportion: 50,
  showmoves: true,
  threshold: 99,
};

const Segregation = () => (
  <Model
    initialParams={params}
    initData={initData}
    updateData={updateData}
    maxTime={50}
    delay={100}
    controls={[
      { param: 'tolerance', label: 'Tolerance' },
      { param: 'proportion', label: 'Proportion' },
      { param: 'threshold', label: 'Threshold' },
      { param: 'showmoves', label: 'Show moves', type: 'toggle' },
    ]}
  >
    <Flex flexDirection="column">
      <Frame />
      <TimeSeries series={series} />
      <Counter series={counterSeries} />
    </Flex>
  </Model>
);

export default Segregation;
