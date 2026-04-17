import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import gameOfLifeSim from '../sims/gameOfLifeSim';

const CELL_PX = 11;

function LifeGrid() {
  const { data, params } = useSimulation<typeof gameOfLifeSim>();

  return (
    <div
      role='img'
      aria-label='Game of Life grid'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${params.width}, ${CELL_PX}px)`,
        width: params.width * CELL_PX,
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      {data.grid.map((row, y) =>
        row.map((alive, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: CELL_PX,
              height: CELL_PX,
              boxSizing: 'border-box',
              background: alive ? '#1a1a1a' : '#f3f3f3',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          />
        ))
      )}
    </div>
  );
}

export function GameOfLifeDemo() {
  return (
    <Simulation
      sim={gameOfLifeSim}
      maxTime={2000}
      delayMs={100}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={2000}
          showStepButton
          controls={{
            type: 'range',
            param: 'density',
            label: 'Grid density',
            min: 0,
            max: 1,
            step: 0.01,
          }}
        />
        <LifeGrid />
      </div>
    </Simulation>
  );
}
