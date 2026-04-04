import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { FibonacciData } from '../sims/fibonacciSim';
import type { FibonacciSpiralParams, FibonacciSpiralRenderState } from '../sims/fibonacciSpiralSim';
import { drawFibonacciSpiral } from '../sims/fibonacciSpiralSim';

const phi = 0.5 + Math.sqrt(5) / 2;
const moduleUrl = new URL('../sims/fibonacciSpiralSim.ts', import.meta.url).href;

function FibonacciSpiralCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { tick, params } = useWorkerRenderSimulationContext<
    FibonacciData,
    FibonacciSpiralParams,
    FibonacciSpiralRenderState,
    unknown
  >();

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    const w = params.size;
    const h = w / phi;
    if (el.width !== w) el.width = w;
    if (el.height !== h) el.height = h;
    drawFibonacciSpiral(ctx, { size: w, tick });
  }, [params.size, tick]);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
        <PlayPauseButton />
        <StopButton />
        <StepButton />
        <TickReadout />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: 'min(100%, 360px)',
          height: 'auto',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 8
        }}
      />
    </>
  );
}

export function FibonacciSpiralDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<FibonacciData, FibonacciSpiralParams, FibonacciSpiralRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: { size: 332 },
          minTime: 0,
          maxTime: 15,
          delayMs: 100,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <FibonacciSpiralCanvas />
      </WorkerRenderSimulation>
    </div>
  );
}
