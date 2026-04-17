import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { StandardControls } from 'react-sim-react/controls';
import { useSimulation } from 'react-sim-react/hooks';
import segregationSim from '../sims/segregationSim';
import type { SegData, SegParams } from '../sims/segregationSim';
import { defaultParams, draw } from '../sims/segregationSim';

function SegregationLocalFrame(props: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const { data, params, tick } = useSimulation<typeof segregationSim>();

  React.useEffect(() => {
    const canvas = props.canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw({ ctx, snapshot: { data, params } });
  }, [data, params, props.canvasRef, tick]);

  return null;
}

export function SegregationLocalDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <canvas
        ref={canvasRef}
        width={defaultParams.width}
        height={defaultParams.height}
        style={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)' }}
      />

      <Simulation
        sim={segregationSim}
        maxTime={50}
        delayMs={100}
      >
        <SegregationLocalFrame canvasRef={canvasRef} />
        <StandardControls
          maxTime={50}
          showStepButton
          controls={[
            { type: 'range', param: 'tolerance', label: 'Tolerance', min: 0, max: 100, step: 1 },
            { type: 'range', param: 'proportion', label: 'Proportion', min: 0, max: 100, step: 1 },
            { type: 'range', param: 'threshold', label: 'Threshold', min: 0, max: 100, step: 1 },
            { type: 'toggle', param: 'showmoves', label: 'Show moves' }
          ]}
        />
      </Simulation>
    </div>
  );
}
