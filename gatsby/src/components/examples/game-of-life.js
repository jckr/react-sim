import React from 'react';
import { FlexRow, FlexColumn, Model } from 'react-sim';

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

function initGrid({ height, width, density }) {
  return Array(height)
    .fill(0)
    .map(row =>
      Array(width)
        .fill(0)
        .map(() => Number(Math.random() < density))
    );
}

export class GameOfLifeFrame extends React.Component {
  static defaultProps = {
    size: 12,
    accessor: d => d,
  };
  render() {
    if (this.props.data === null) {
      return null;
    }
    const { accessor, data, size } = this.props;
    return (
      <div>
        {data.map((row, index) => (
          <FlexRow key={`r-${index}`} styles={{ height: size }}>
            {row.map((cell, index) => (
              <FlexColumn
                key={`c-${index}`}
                styles={{
                  width: size,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // border: "1px solid black"
                }}
              >
                <div
                  style={{
                    background: '#000',
                    borderRadius: accessor(cell) ? 0 : '50%',
                    width: accessor(cell) ? '100%' : 0,
                    height: accessor(cell) ? '100%' : 0,
                    // transition: "all 0.1s"
                  }}
                ></div>
              </FlexColumn>
            ))}
          </FlexRow>
        ))}
      </div>
    );
  }
}

const Frame = ({ data, size = 12, initData }) => {
  if (data === null) {
    return null;
  }
  return (
    <div>
      {data.map((row, index) => (
        <div
          key={`r-${index}`}
          style={{ display: 'flex', flexDirection: 'row', height: size }}
        >
          {row.map((cell, index) => (
            <div
              key={`c-${index}`}
              style={{
                width: size,
                background: cell ? '#000' : 'none',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

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
      height: 24,
      width: 48,
      density: 0.15,
    }}
  >
    <Frame />
  </Model>
);

export const Step2 = () => (
  <Model
    initData={initGrid}
    initialParams={{
      height: 24,
      width: 48,
      density: 0.15,
    }}
  >
    <Frame />
  </Model>
);

export const Step3 = () => (
  <Model
    initData={initGrid}
    updateData={updateGridNoComplete}
    initialParams={{
      height: 24,
      width: 48,
      density: 0.15,
    }}
  >
    <Frame />
  </Model>
);

export const Step4 = () => (
  <Model
    initData={initGrid}
    updateData={updateGameOfLifeGrid}
    initialParams={{
      height: 24,
      width: 48,
      density: 0.15,
    }}
  >
    <Frame />
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
    <Frame />
  </Model>
);

export default GameOfLife;
