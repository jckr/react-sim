import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulationContext } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';

function CounterFrame() {
  const { data, tick } = useSimulationContext<{ value: number }, { step: number; start: number }, unknown>();

  return (
    <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.15)', borderRadius: 8 }}>
      <div style={{ fontFamily: 'monospace' }}>tick: {tick}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 24, marginTop: 6 }}>{data.value}</div>
    </div>
  );
}

export function CounterDemo() {
  const initData = (params: { start: number }) => ({ value: params.start });

  const updateData = ({
    data,
    params
  }: {
    data: { value: number };
    params: { step: number; start: number };
    tick: number;
    cachedData: Record<number, { value: number }>;
  }) => {
    return { status: 'continue' as const, data: { value: data.value + params.step } };
  };

  return (
    <Simulation
      initData={initData}
      updateData={updateData}
      config={{
        initialParams: { start: 0, step: 1 },
        minTime: 0,
        maxTime: 50,
        delayMs: 0,
        ticksPerAnimation: 1,
        loop: false
      }}
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
              minValue: 0,
              maxValue: 10,
              step: 1
            }
          ]}
        />
        <CounterFrame />
      </div>
    </Simulation>
  );
}
