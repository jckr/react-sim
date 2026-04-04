import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { SnakeData, SnakeParams, SnakeRenderState } from '../sims/snakeSim';
import { drawSnakeFrame } from '../sims/snakeCanvas';

const moduleUrl = new URL('../sims/snakeSim.ts', import.meta.url).href;

function SnakeCanvasInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const didAutoPlayRef = React.useRef(false);
  const { data, params, play, canPlay } = useWorkerRenderSimulationContext<SnakeData, SnakeParams, SnakeRenderState, unknown>();

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

    const { cellSize, width: cols, height: rows, displayGrid, displayCircuit, displayHead } = params;
    const pixelWidth = cols * cellSize;
    const pixelHeight = rows * cellSize;
    if (el.width !== pixelWidth) el.width = pixelWidth;
    if (el.height !== pixelHeight) el.height = pixelHeight;

    drawSnakeFrame({
      ctx,
      pixelWidth,
      pixelHeight,
      cellSize,
      cols,
      rows,
      displayGrid,
      displayCircuit,
      displayHead,
      data
    });
  }, [data, params]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        maxWidth: '100%',
        height: 'auto',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 8
      }}
    />
  );
}

export function SnakeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<SnakeData, SnakeParams, SnakeRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            cellSize: 4,
            delay: 100,
            displayCircuit: true,
            displayGrid: false,
            displayHead: true,
            fruitGrowth: 4,
            height: 80,
            width: 80,
            initialLength: 2,
            safeMode: false,
            speed: 'fast',
            snakePosRandom: true,
            directionRandom: true,
            xHead: 10,
            yHead: 10,
            directionText: 'right'
          },
          minTime: 0,
          maxTime: 500_000,
          delayMs: 0,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
          AI snake: shortest paths to fruit and Hamiltonian-style circuits (original react-sim demo). Worker ticks; canvas
          draws on the main thread.
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <PlayPauseButton />
          <StopButton />
          <StepButton />
          <TickReadout />
        </div>
        <SnakeCanvasInner />
      </WorkerRenderSimulation>
    </div>
  );
}
