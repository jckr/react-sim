import React, { useRef, useEffect } from 'react';
import { Flex, Box } from 'rebass';
import { Model as RawModel, CanvasFrame } from 'react-sim';

const Model = props => (
  <Flex sx={{ border: '1px solid #000', p: 2, width: 'fit-content' }}>
    <RawModel {...props} />
  </Flex>
);

const EMPTY = 0;
const ROCK = 1;
const ROCK_WITH_ROCK_ON_RIGHT = 2;
const ROCK_WITH_ROCK_BELOW = 3;
const ROCK_WITH_ROCK_RIGHT_AND_BELOW = 4;
const ROCK_WITH_ROCKS_ALL_AROUND = 5;
const WATER_FROM_TOP = 6;
const WATER_FROM_RIGHT = 7;
const WATER_FROM_LEFT = 8;

const status = {
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

export function updateData({ data, params, complete }) {
  const { queue, grid } = data;
  const { height, width } = params;
  let updatedStatus = data.status;
  if (queue.length === 0) {
    updatedStatus = status.failure;
  }
  const nextQueue = [];
  while (queue.length > 0 && updatedStatus === status.pending) {
    const cell = queue.shift();
    const { x, y } = cell;
    if (y === height - 1) {
      updatedStatus = status.success;
    } else if (grid[y + 1][x] === EMPTY) {
      grid[y + 1][x] = WATER_FROM_TOP;
      nextQueue.push({ x, y: y + 1 });
    }
    // note - grid[y][x - 1] and grid[y][x + 1] can be undefined,
    // but that doesn't make any difference.
    if (grid[y][x - 1] === EMPTY) {
      grid[y][x - 1] = WATER_FROM_RIGHT;
      nextQueue.push({ x: x - 1, y });
    }
    if (grid[y][x + 1] === EMPTY) {
      grid[y][x + 1] = WATER_FROM_LEFT;
      nextQueue.push({ x: x + 1, y });
    }
  }
  if (updatedStatus !== status.pending && params.shouldComplete) {
    complete(updatedStatus);
  }
  return {
    grid,
    queue: nextQueue,
    status: updatedStatus,
  };
}

export function updateDataGrid({ data, params, complete }) {
  let nbPending = 0;
  data.grids.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell.status === status.pending) {
        const updatedCell = updateData({
          data: cell,
          params: { height: params.height, shouldComplete: false },
        });
        data.grids[y][x] = updatedCell;
        if (updatedCell.status === status.pending) {
          nbPending++;
        }
        if (updatedCell.status === status.success) {
          data.cols[x].result++;
        }
      }
    })
  );
  if (nbPending === 0) {
    complete();
  }
  return data;
}

export function initData({ porosity, height, width }, random = Math.random) {
  const grid = [];
  const queue = [];
  let x, y;
  for (y = 0; y < height; y++) {
    const row = [];
    for (x = 0; x < width; x++) {
      row.push(random > Number(porosity) ? ROCK : EMPTY);
    }
    grid.push(row);
  }

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      if (grid[y][x]) {
        if (grid[y + 1] && grid[y + 1][x]) {
          // rock below
          grid[y][x] = grid[y][x] + 2;
        }
        if (grid[y][x + 1]) {
          // rock to the right
          grid[y][x] = grid[y][x] + 1;
        }
        if (
          grid[y][x] === ROCK_WITH_ROCK_RIGHT_AND_BELOW &&
          grid[y + 1][x + 1]
        ) {
          grid[y][x] = ROCK_WITH_ROCKS_ALL_AROUND;
        }
      } else {
        if (y === 0) {
          grid[y][x] = WATER_FROM_TOP;
          queue.push({ x, y });
        }
      }
    }
  }
  return { grid, queue, status: status.pending };
}

export function draw({
  ctx,
  params: { cellSize, margin, height, width },
  data,
  roundRectangle,
}) {
  ctx.fillStyle = 'beige';
  ctx.fillRect(0, 0, width * cellSize, height * cellSize);

  data.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const x = colIndex * cellSize;
      const y = rowIndex * cellSize;
      if (cell >= ROCK && cell <= ROCK_WITH_ROCKS_ALL_AROUND) {
        // rock
        ctx.fillStyle = '#777';

        roundRectangle({
          ctx,
          x: x + margin,
          y: y + margin,
          r: margin,
          height: cellSize - 2 * margin,
          width: cellSize - 2 * margin,
        });
        ctx.fill();
        if (
          cell === ROCK_WITH_ROCK_ON_RIGHT ||
          cell === ROCK_WITH_ROCK_RIGHT_AND_BELOW ||
          cell === ROCK_WITH_ROCKS_ALL_AROUND
        ) {
          ctx.fillRect(
            x + cellSize - 2 * margin,
            y + margin,
            4 * margin,
            cellSize - 2 * margin
          );
        }
        if (
          cell === ROCK_WITH_ROCK_BELOW ||
          cell === ROCK_WITH_ROCK_RIGHT_AND_BELOW ||
          cell === ROCK_WITH_ROCKS_ALL_AROUND
        ) {
          ctx.fillRect(
            x + margin,
            y + cellSize - 2 * margin,
            cellSize - 2 * margin,
            4 * margin
          );
        }
        if (cell === ROCK_WITH_ROCKS_ALL_AROUND) {
          ctx.fillRect(
            x + cellSize - 2 * margin,
            y + cellSize - 2 * margin,
            4 * margin,
            4 * margin
          );
        }
      }
      if (cell >= WATER_FROM_TOP) {
        ctx.lineWidth = cellSize - 2 * margin;
        ctx.strokeStyle = 'cyan';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x + cellSize / 2, y + cellSize / 2);
        if (cell === WATER_FROM_TOP) {
          ctx.lineTo(x + cellSize / 2, Math.max(y - cellSize / 2, 0));
        }
        if (cell === WATER_FROM_LEFT) {
          ctx.lineTo(x - cellSize / 2, y + cellSize / 2);
        }
        if (cell === WATER_FROM_RIGHT) {
          ctx.lineTo(x + (3 * cellSize) / 2, y + cellSize / 2);
        }
        ctx.stroke();
      }
    });
  });
}

export const PercolationFrame = ({ data, params }) => {
  const { cellSize, margin, height, width } = params;

  return (
    <div
      style={{
        boxSizing: 'content-box',
        height: cellSize * height,
        width: cellSize * width,
        border: `3px solid ${
          data.status === status.pending
            ? 'transparent'
            : data.status === status.success
            ? '#33e'
            : '#777'
        }`,
      }}
    >
      <CanvasFrame
        data={data}
        width={width * cellSize}
        height={height * cellSize}
        draw={draw}
      />
    </div>
  );
};

export const PercolationFrameGrid = ({ data, params }) => {
  const ch = params.height * params.cellSize;
  const cw = params.width * params.cellSize;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: (ch + 10) * params.rows + 60,
        width: (cw + 10) * params.cols + 10,
      }}
    >
      <Flex flexDirection="row">
        {data.cols.map(c => (
          <Box
            sx={{
              width: [cw],
              fontSize: 1,
              textAlign: 'center',
              fontWeight: 2,
              m: '5px',
            }}
          >
            {c.p.toFixed(2)}
          </Box>
        ))}
      </Flex>
      {data.grids.map((row, y) => (
        <div style={{ display: 'flex', flexDirection: 'row' }} key={`row-${y}`}>
          {row.map((cell, x) => (
            <div
              style={{
                height: params.height * params.cellSize,
                width: params.width * params.cellSize,
                margin: 5,
              }}
            >
              <PercolationFrame
                key={`cell-${x}-${y}`}
                data={cell}
                params={params}
              />
            </div>
          ))}
        </div>
      ))}
      <Flex flexDirection="row">
        {data.cols.map(c => (
          <Box
            sx={{
              width: [cw],
              fontSize: 1,
              textAlign: 'center',
              m: '5px',
            }}
          >
            {`${c.result}/${c.total}`}
          </Box>
        ))}
      </Flex>
    </div>
  );
};

export const Percolation = () => {
  return (
    <>
      <Model
        auto={false}
        controls={{
          param: 'porosity',
          label: 'Porosity',
          minValue: 0,
          maxValue: 1,
          step: 0.01,
        }}
        updateData={updateData}
        maxTime={Infinity}
        initData={initData}
        initialParams={{
          width: 100,
          height: 100,
          cellSize: 5,
          margin: 0,
          porosity: 0.6,
          shouldComplete: true,
        }}
      >
        <PercolationFrame />
      </Model>
    </>
  );
};

export function initDataGrid({
  width,
  height,
  cellSize,
  margin,
  rows,
  cols,
  minP,
  stepP,
}) {
  const ck = [...Array(cols).keys()];
  return {
    cols: ck.map(c => ({ p: minP + c * stepP, result: 0, total: rows })),
    grids: [...Array(rows).keys()].map(r =>
      ck.map(c =>
        initData({
          height,
          width,
          porosity: minP + c * stepP,
        })
      )
    ),
  };
}

export const PercolationGrid = () => {
  return (
    <>
      <Model
        auto={false}
        updateData={updateDataGrid}
        maxTime={Infinity}
        initData={initDataGrid}
        initialParams={{
          width: 20,
          height: 20,
          cellSize: 1.5,
          margin: 0,
          rows: 10,
          cols: 10,
          minP: 0.5,
          stepP: 0.02,
        }}
      >
        <PercolationFrameGrid />
      </Model>
    </>
  );
};
