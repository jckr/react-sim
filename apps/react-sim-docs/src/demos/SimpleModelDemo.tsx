import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import simpleModelSim from '../sims/simpleModelSim';

const GRID = 10;
const CELL = 36;

function SimpleModelInner() {
  const { tick } = useSimulation<typeof simpleModelSim>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <StandardControls maxTime={100} showStepButton />
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
    <Simulation
      sim={simpleModelSim}
      maxTime={100}
      delayMs={80}
    >
      <SimpleModelInner />
    </Simulation>
  );
}
