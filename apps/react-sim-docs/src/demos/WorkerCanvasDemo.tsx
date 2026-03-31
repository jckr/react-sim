import React from 'react';
import { WorkerSimulation } from 'react-sim-react/worker-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useSimulationContext } from 'react-sim-react/hooks';
import type { XorRingData, XorRingParams } from '../sims/xorRingSim';

const moduleUrl = new URL('../sims/xorRingSim.ts', import.meta.url).href;

function XorRingMeta() {
  const { tick, params } = useSimulationContext<XorRingData, XorRingParams, unknown>();
  return (
    <span style={{ fontFamily: 'monospace', opacity: 0.85 }}>
      tick: {tick} · cells: {params.cells}
    </span>
  );
}

export function WorkerCanvasDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerSimulation<XorRingData, XorRingParams, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        canvasRef={canvasRef}
        config={{
          initialParams: { cells: 240, density: 0.35 },
          minTime: 0,
          delayMs: 48,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <PlayPauseButton />
          <StepButton />
          <StopButton />
          <TickReadout />
          <XorRingMeta />
        </div>

        <canvas
          ref={canvasRef}
          style={{
            width: 'min(100%, 640px)',
            height: 56,
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 8,
            imageRendering: 'pixelated'
          }}
        />
      </WorkerSimulation>
    </div>
  );
}
