import React from "react";
import { FlexRow, FlexColumn, Model } from "react-sim";

// helpers

function getHeightWidth(grid) {
  if (!grid) {
    return [0, 0];
  }
  const height = grid.length;
  if (!height) {
    return [0, 0];
  }
  const width = grid[0].length;
  return [height, width];
}
function countNeighbors(x, y, grid) {
  const [height, width] = getHeightWidth(grid);

  if (x >= width || x < 0 || y >= height || y < 0) {
    return 0;
  }
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

export function updateGameOfLifeGrid({data, pause}) {
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
  if (changes === 0) {pause()}
  return updatedGrid;
}

function initGrid({ height, width, creator }) {
  return [...Array(height).keys()].map(row =>
    [...Array(width).keys()].map(creator)
  );
}

export class GameOfLifeFrame extends React.Component {
  render() {
    if (this.props.data === null) {
      return null;
    }
    return (
      <div>
        {this.props.data.map((row, index) => (
          <FlexRow key={`r-${index}`} styles={{ height: "12px" }}>
            {row.map((cell, index) => (
              <FlexColumn
                key={`c-${index}`}
                styles={{
                  width: "12px",
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid black"
                }}
              >
                <div
                  style={{
                    background: "#000",
                    borderRadius: cell ? 0 : "50%",
                    width: cell ? "100%" : 0,
                    height: cell ? "100%" : 0,
                    transition: "all 0.1s"
                  }}
                ></div>
              </FlexColumn>
            ))}
          </FlexRow>
        ))}
        <div
          style={{
            cursor: "pointer",
            background: "#eee",
            padding: "8px",
            margin: "8px 8px 8px 0",
            width: "fit-content"
          }}
          onClick={this.props.initData}
        >
          Reset grid
        </div>
      </div>
    );
  }
}

const GameOfLife = () => (
  <Model
    auto={false}
    updateData={updateGameOfLifeGrid}
    maxTime={Infinity}
    initData={initGrid}
    initialParams={{
      height: 24,
      width: 48,
      creator: () => Number(Math.random()) > 0.85
    }}
  >
    <GameOfLifeFrame />
  </Model>
);

export default GameOfLife;
