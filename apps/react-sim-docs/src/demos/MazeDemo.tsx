import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { MazeData, MazeParams, MazeRenderState } from '../sims/mazeSim';
import { drawMazeFrame } from '../sims/mazeCanvas';

const moduleUrl = new URL('../sims/mazeSim.ts', import.meta.url).href;

const GRIDS: MazeParams['grid'][] = ['square', 'hexagonal', 'triangular', 'circle'];

function MazeCanvasInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const didAutoPlayRef = React.useRef(false);
  const { data, tick, params, play, canPlay } = useWorkerRenderSimulationContext<
    MazeData,
    MazeParams,
    MazeRenderState,
    unknown
  >();

  React.useEffect(() => {
    if (canPlay && !didAutoPlayRef.current) {
      didAutoPlayRef.current = true;
      play();
    }
  }, [canPlay, play]);

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    if (!data) return;
    const w = params.width;
    const h = params.height;
    if (el.width !== w) el.width = w;
    if (el.height !== h) el.height = h;
    drawMazeFrame({ ctx, pixelWidth: w, pixelHeight: h, tick, params, data });
  }, [data, params, tick]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 'min(100%, 360px)',
        height: 'auto',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 8
      }}
    />
  );
}

function MazeGridControls() {
  const { params, setParams } = useWorkerRenderSimulationContext<MazeData, MazeParams, MazeRenderState, unknown>();
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, flexWrap: 'wrap' }}>
      <span style={{ minWidth: 80 }}>Grid</span>
      <select
        value={params.grid}
        onChange={(e) => {
          const grid = e.target.value as MazeParams['grid'];
          setParams({ grid }, { reset: true });
        }}
        style={{ minWidth: 140, padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.2)' }}
      >
        {GRIDS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <span style={{ fontSize: 12, color: '#666' }}>Changing grid resets the maze.</span>
    </label>
  );
}

export function MazeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<MazeData, MazeParams, MazeRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            drawItem: true,
            useColor: false,
            width: 332,
            height: 332,
            grid: 'square',
            cellSize: 10,
            wallColor: '#000',
            pathColor: '#0b57d0',
            ticksPerAnimation: 20
          },
          minTime: 0,
          maxTime: 50_000,
          delayMs: 0,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
          Randomized depth-first maze carving on four tilings (original react-sim demo). Worker ticks; canvas draws walls
          and carved passages on the main thread.
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <PlayPauseButton />
          <StopButton />
          <StepButton />
          <TickReadout />
        </div>
        <MazeGridControls />
        <MazeCanvasInner />
      </WorkerRenderSimulation>
    </div>
  );
}
