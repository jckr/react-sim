import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { LangtonData, LangtonParams, LangtonRenderState } from '../sims/langtonAntSim';

const moduleUrl = new URL('../sims/langtonAntSim.ts', import.meta.url).href;

function LangtonInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const didAutoPlayRef = React.useRef(false);
  const { data, params, play, canPlay } = useWorkerRenderSimulationContext<
    LangtonData,
    LangtonParams,
    LangtonRenderState,
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
    const width = params.width;
    const height = params.height;
    if (el.width !== width) el.width = width;
    if (el.height !== height) el.height = height;

    const gw = data?.gridWidth ?? params.gridWidth;
    const gh = data?.gridHeight ?? params.gridHeight;
    const cw = width / gw;
    const ch = height / gh;

    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(0, 0, width, height);

    const cells = data?.cells;
    if (data && cells && cells.length === gw * gh) {
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          const v = cells[y * gw + x];
          ctx.fillStyle = v ? '#1c1c1c' : '#f4f4f4';
          ctx.fillRect(x * cw, y * ch, cw + 0.5, ch + 0.5);
        }
      }
      const ax = data.antX;
      const ay = data.antY;
      ctx.fillStyle = '#c43a3a';
      ctx.beginPath();
      ctx.arc((ax + 0.5) * cw, (ay + 0.5) * ch, Math.min(cw, ch) * 0.38, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [data, params.height, params.width, params.gridHeight, params.gridWidth]);

  return (
    <>
      <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
        On a white square the ant turns right, flips the cell, and steps; on black it turns left. After many steps the path
        becomes orderly — then chaotic again. Ticks run in a worker; the canvas reads <code>selectRenderState</code> on the
        main thread.
      </p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
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

export function LangtonAntDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<LangtonData, LangtonParams, LangtonRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            width: 332,
            height: 332,
            gridWidth: 83,
            gridHeight: 83
          },
          minTime: 0,
          maxTime: 120_000,
          delayMs: 0,
          ticksPerAnimation: 6,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <LangtonInner />
      </WorkerRenderSimulation>
    </div>
  );
}
