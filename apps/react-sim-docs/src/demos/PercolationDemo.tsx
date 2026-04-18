import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import percolationSim, {
  ROCK,
  WATER_FROM_TOP,
  WATER_FROM_LEFT,
  WATER_FROM_RIGHT,
} from '../sims/percolationSim';

const CELL_PX = 6;

function cellColor(cell: number): string {
  if (cell === ROCK) return '#555';
  if (cell === WATER_FROM_TOP || cell === WATER_FROM_LEFT || cell === WATER_FROM_RIGHT)
    return '#38bdf8';
  // EMPTY
  return '#f0ebe3';
}

function PercolationGrid() {
  const { data, params } = useSimulation<typeof percolationSim>();

  const borderColor =
    data.result === 'success'
      ? '#3366ee'
      : data.result === 'failure'
        ? '#777'
        : 'transparent';

  return (
    <div
      style={{
        border: `3px solid ${borderColor}`,
        borderRadius: 4,
        display: 'inline-block',
      }}
    >
      <canvas
        ref={(canvas) => {
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const w = params.width * CELL_PX;
          const h = params.height * CELL_PX;
          canvas.width = w;
          canvas.height = h;
          ctx.fillStyle = '#f0ebe3';
          ctx.fillRect(0, 0, w, h);

          for (let y = 0; y < data.grid.length; y++) {
            const row = data.grid[y];
            for (let x = 0; x < row.length; x++) {
              const color = cellColor(row[x]);
              if (color !== '#f0ebe3') {
                ctx.fillStyle = color;
                ctx.fillRect(x * CELL_PX, y * CELL_PX, CELL_PX, CELL_PX);
              }
            }
          }
        }}
      />
    </div>
  );
}

export function PercolationDemo() {
  return (
    <Simulation sim={percolationSim} maxTime={Infinity} delayMs={30}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={10000}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'porosity',
              label: 'Porosity',
              min: 0,
              max: 1,
              step: 0.01,
            },
            {
              type: 'range',
              param: 'width',
              label: 'Grid width',
              min: 10,
              max: 100,
              step: 1,
            },
            {
              type: 'range',
              param: 'height',
              label: 'Grid height',
              min: 10,
              max: 100,
              step: 1,
            },
          ]}
        />
        <PercolationGrid />
      </div>
    </Simulation>
  );
}
