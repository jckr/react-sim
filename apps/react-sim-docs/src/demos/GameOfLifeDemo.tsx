import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulationContext } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import type { GameOfLifeData, GameOfLifeParams } from '../sims/gameOfLifeSim';
import { initData, updateGameOfLifeGrid } from '../sims/gameOfLifeSim';

const CELL_PX = 11;

function LifeGrid() {
  const { data, params } = useSimulationContext<GameOfLifeData, GameOfLifeParams, unknown>();

  return (
    <div
      role="img"
      aria-label="Game of Life grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${params.width}, ${CELL_PX}px)`,
        width: params.width * CELL_PX,
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 6,
        overflow: 'hidden'
      }}
    >
      {data.map((row, y) =>
        row.map((alive, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: CELL_PX,
              height: CELL_PX,
              boxSizing: 'border-box',
              background: alive ? '#1a1a1a' : '#f3f3f3',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          />
        ))
      )}
    </div>
  );
}

export function GameOfLifeDemo() {
  return (
    <Simulation<GameOfLifeData, GameOfLifeParams, unknown>
      initData={initData}
      updateData={(args) => updateGameOfLifeGrid({ data: args.data, params: args.params })}
      config={{
        initialParams: { height: 28, width: 28, density: 0.15 },
        minTime: 0,
        maxTime: 2000,
        delayMs: 100,
        ticksPerAnimation: 1,
        loop: false
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={2000}
          minTime={0}
          showStepButton
          controls={{
            type: 'range',
            param: 'density',
            label: 'Grid density',
            minValue: 0,
            maxValue: 1,
            step: 0.01,
            resetOnChange: true
          }}
        />
        <LifeGrid />
      </div>
    </Simulation>
  );
}
