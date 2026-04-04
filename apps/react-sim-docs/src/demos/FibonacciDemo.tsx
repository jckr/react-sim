import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulationContext } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import type { FibonacciData, FibonacciParams } from '../sims/fibonacciSim';
import { initData, updateData } from '../sims/fibonacciSim';

function FibonacciList() {
  const { data } = useSimulationContext<FibonacciData, FibonacciParams, unknown>();
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
    <Simulation<FibonacciData, FibonacciParams, unknown>
      initData={initData}
      updateData={updateData}
      config={{
        initialParams: {},
        minTime: 0,
        maxTime: 20,
        delayMs: 200,
        ticksPerAnimation: 1,
        loop: false
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls maxTime={20} minTime={0} showStepButton />
        <FibonacciList />
      </div>
    </Simulation>
  );
}
