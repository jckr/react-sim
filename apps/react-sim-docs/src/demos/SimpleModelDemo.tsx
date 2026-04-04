import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulationContext } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import type { SimpleModelData, SimpleModelParams } from '../sims/simpleModelSim';
import { initData, updateData } from '../sims/simpleModelSim';

const GRID = 10;
const CELL = 36;

function SimpleModelInner() {
  const { tick } = useSimulationContext<SimpleModelData, SimpleModelParams, unknown>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <StandardControls maxTime={100} minTime={0} showStepButton />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
          width: GRID * CELL,
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      >
        {Array.from({ length: GRID * GRID }, (_, i) => {
          const on = 10 * Math.floor(i / GRID) + (i % GRID) <= tick;
          return (
            <div
              key={i}
              style={{
                width: CELL,
                height: CELL,
                boxSizing: 'border-box',
                background: on ? 'rgba(11, 87, 208, 0.35)' : '#f5f5f5',
                border: '1px solid rgba(0,0,0,0.06)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SimpleModelDemo() {
  return (
    <Simulation<SimpleModelData, SimpleModelParams, unknown>
      initData={initData}
      updateData={updateData}
      config={{
        initialParams: {},
        minTime: 0,
        maxTime: 100,
        delayMs: 80,
        ticksPerAnimation: 1,
        loop: false
      }}
    >
      <SimpleModelInner />
    </Simulation>
  );
}
