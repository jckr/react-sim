import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import segregationSim, { draw } from '../sims/segregationSim';

function SegregationCanvas() {
  const { data, params } = useSimulation<typeof segregationSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;
    draw({ ctx, snapshot: { data, params } });
  }, [data, params]);

  return (
    <canvas
      ref={canvasRef}
      width={params.width}
      height={params.height}
      style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6 }}
    />
  );
}

function SegregationStats() {
  const { data } = useSimulation<typeof segregationSim>();
  if (!data) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.04)',
        borderRadius: 6,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      <span>Happiness: {(data.happiness * 100).toFixed(1)}%</span>
      <span>Total moves: {data.totalMoves}</span>
    </div>
  );
}

export function SegregationDemo() {
  return (
    <Simulation sim={segregationSim} maxTime={500} delayMs={50}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={500}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'tolerance',
              label: 'Tolerance (%)',
              min: 0,
              max: 100,
              step: 1,
            },
            {
              type: 'range',
              param: 'proportion',
              label: 'Proportion (%)',
              min: 10,
              max: 90,
              step: 1,
            },
            {
              type: 'range',
              param: 'threshold',
              label: 'Threshold (%)',
              min: 50,
              max: 100,
              step: 1,
            },
            {
              type: 'toggle',
              param: 'showmoves',
              label: 'Show moves',
            },
          ]}
        />
        <SegregationStats />
        <SegregationCanvas />
      </div>
    </Simulation>
  );
}
