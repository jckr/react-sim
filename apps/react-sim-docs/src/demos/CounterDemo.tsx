import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import counterSim from '../sims/counterSim';

function CounterFrame() {
  const { data, tick } = useSimulation<typeof counterSim>();

  return (
    <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 8 }}>
      <div style={{ fontFamily: 'monospace' }}>tick: {tick}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 24, marginTop: 6 }}>{data.value}</div>
    </div>
  );
}

export function CounterDemo() {
  return (
    <Simulation
      sim={counterSim}
      maxTime={50}
      delayMs={0}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>
          Use <strong>Step</strong> to advance one tick while paused. Change <strong>Amount per tick</strong> without
          resetting the run.
        </p>
        <StandardControls
          maxTime={50}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'step',
              label: 'Amount per tick',
              min: 0,
              max: 10,
              step: 1
            }
          ]}
        />
        <CounterFrame />
      </div>
    </Simulation>
  );
}
