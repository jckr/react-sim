import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import fibonacciSim from '../sims/fibonacciSim';

function FibonacciList() {
  const { data } = useSimulation<typeof fibonacciSim>();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {data.map((n, i) => (
        <div
          key={`fib-${i}-${n}`}
          style={{
            margin: 0,
            padding: '10px 12px',
            background: 'rgba(0,0,0,0.06)',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: 14
          }}
        >
          {n}
        </div>
      ))}
    </div>
  );
}

export function FibonacciDemo() {
  return (
    <Simulation
      sim={fibonacciSim}
      maxTime={20}
      delayMs={200}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls maxTime={20} showStepButton />
        <FibonacciList />
      </div>
    </Simulation>
  );
}
