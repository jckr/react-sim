import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { StandardControls } from 'react-sim-react/controls';
import { useSimulationContext } from 'react-sim-react/hooks';
import type { SegData, SegParams } from '../sims/segregationSim';
import { defaultParams, draw, initData, updateData } from '../sims/segregationSim';

function SegregationLocalFrame(props: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  const { data, params, tick } = useSimulationContext<SegData, SegParams, unknown>();

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

      <Simulation<SegData, SegParams, unknown>
        config={{
          initialParams: defaultParams,
          minTime: 0,
          maxTime: 50,
          delayMs: 100,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          context: null
        }}
        initData={initData}
        updateData={({ data, params, tick, cachedData }) => updateData({ data, params, tick, cachedData })}
      >
        <SegregationLocalFrame canvasRef={canvasRef} />
        <StandardControls
          maxTime={50}
          minTime={0}
          showStepButton
          controls={[
            { type: 'range', param: 'tolerance', label: 'Tolerance', minValue: 0, maxValue: 100, step: 1 },
            { type: 'range', param: 'proportion', label: 'Proportion', minValue: 0, maxValue: 100, step: 1, resetOnChange: true },
            { type: 'range', param: 'threshold', label: 'Threshold', minValue: 0, maxValue: 100, step: 1 },
            { type: 'toggle', param: 'showmoves', label: 'Show moves', resetOnChange: false }
          ]}
        />
      </Simulation>
    </div>
  );
}
