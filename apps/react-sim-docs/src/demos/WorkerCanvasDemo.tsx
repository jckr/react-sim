import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useSimulationContext } from 'react-sim-react/hooks';
import type { XorRingData, XorRingParams, XorRingRenderState } from '../sims/xorRingSim';

const moduleUrl = new URL('../sims/xorRingSim.ts', import.meta.url).href;

function XorRingMeta() {
  const { tick, params } = useSimulationContext<XorRingData, XorRingParams, unknown>();
  return (
    <span style={{ fontFamily: 'monospace', opacity: 0.85 }}>
      tick: {tick} · cells: {params.cells}
    </span>
  );
}

/** Must render under `<WorkerRenderSimulation>` so `useSimulationContext` has a provider. */
function XorRingWorkerCanvasInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { data, tick, params } = useSimulationContext<XorRingData, XorRingParams, unknown>();

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const w = params.cells;
    const h = 56;
    if (el.width !== w) el.width = w;
    if (el.height !== h) el.height = h;

    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, w, h);

    if (Array.isArray(data) && data.length >= w) {
      ctx.fillStyle = '#111';
      for (let i = 0; i < w; i++) {
        if (data[i]) ctx.fillRect(i, 0, 1, h);
      }
    }
  }, [data, params.cells, tick]);

  return (
    <>
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
    </>
  );
}

export function WorkerCanvasDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<unknown, XorRingParams, XorRingRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
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
        <XorRingWorkerCanvasInner />
      </WorkerRenderSimulation>
    </div>
  );
}
