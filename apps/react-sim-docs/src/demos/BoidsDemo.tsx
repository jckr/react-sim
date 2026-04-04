import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import {
  boidsFromSnapshot,
  type BoidsData,
  type BoidsParams,
  type BoidsRenderState
} from '../sims/boidsSim';

const moduleUrl = new URL('../sims/boidsSim.ts', import.meta.url).href;

function strokeCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function BoidsCanvasInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const didAutoPlayRef = React.useRef(false);
  const { data, params, play, canPlay } = useWorkerRenderSimulationContext<BoidsData, BoidsParams, BoidsRenderState, unknown>();
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
    const {
      width,
      height,
      r,
      showCircles,
      alignmentDistance,
      cohesionDistance,
      separationDistance
    } = params;
    if (el.width !== width) el.width = width;
    if (el.height !== height) el.height = height;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    const boids = boidsFromSnapshot(data);
    if (!boids?.length) return;

    boids.forEach(({ position: [x, y], angle }) => {
      ctx.strokeStyle = '#000';
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      ctx.lineTo(
        x + (Math.cos(angle + (Math.PI * 2) / 3) * r * 2) / 3,
        y + (Math.sin(angle + (Math.PI * 2) / 3) * r * 2) / 3
      );
      ctx.lineTo(
        x + (Math.cos(angle + (Math.PI * 4) / 3) * r * 2) / 3,
        y + (Math.sin(angle + (Math.PI * 4) / 3) * r * 2) / 3
      );
      ctx.closePath();
      ctx.stroke();

      if (showCircles) {
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = '#f00';
        strokeCircle(ctx, x, y, separationDistance);
        ctx.strokeStyle = '#0f0';
        strokeCircle(ctx, x, y, alignmentDistance);
        ctx.strokeStyle = '#00f';
        strokeCircle(ctx, x, y, cohesionDistance);
      }
    });
  }, [data, params]);

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

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function BoidsParamControls() {
  const { params, setParams } = useWorkerRenderSimulationContext<BoidsData, BoidsParams, BoidsRenderState, unknown>();

  const row = (
    label: string,
    paramKey: keyof BoidsParams,
    min: number,
    max: number,
    step: number
  ) => (
    <label
      key={String(paramKey)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 13 }}
    >
      <span style={{ minWidth: 140 }}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Number(params[paramKey])}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!Number.isFinite(v)) return;
          setParams({ [paramKey]: clamp(v, min, max) } as Partial<BoidsParams>);
        }}
        style={{ flex: 1, minWidth: 120 }}
      />
      <span style={{ fontVariantNumeric: 'tabular-nums', width: 44 }}>{Number(params[paramKey]).toFixed(2)}</span>
    </label>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8, maxWidth: 520 }}>
      <div style={{ fontSize: 12, color: '#666' }}>Alignment</div>
      {row('Coefficient', 'alignmentCoefficient', 0, 3, 0.01)}
      {row('Radius', 'alignmentDistance', 0, 50, 1)}
      <div style={{ fontSize: 12, color: '#666' }}>Cohesion</div>
      {row('Coefficient', 'cohesionCoefficient', 0, 3, 0.01)}
      {row('Radius', 'cohesionDistance', 0, 50, 1)}
      <div style={{ fontSize: 12, color: '#666' }}>Separation</div>
      {row('Coefficient', 'separationCoefficient', 0, 3, 0.01)}
      {row('Radius', 'separationDistance', 0, 50, 1)}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <input
          type="checkbox"
          checked={params.showCircles}
          onChange={() => setParams({ showCircles: !params.showCircles })}
        />
        Show neighbor circles (red = separation, green = alignment, blue = cohesion)
      </label>
    </div>
  );
}

export function BoidsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<BoidsData, BoidsParams, BoidsRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            alignmentCoefficient: 1,
            alignmentDistance: 50,
            cohesionCoefficient: 1,
            cohesionDistance: 40,
            height: 332,
            maxforce: 0.03,
            maxspeed: 2,
            nbBoids: 50,
            r: 5,
            separationCoefficient: 1.5,
            separationDistance: 25,
            showCircles: true,
            width: 332
          },
          minTime: 0,
          maxTime: 1_000_000,
          delayMs: 0,
          ticksPerAnimation: 1,
          loop: true,
          noCache: true,
          context: null
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
          Flocking: alignment, cohesion, and separation (original react-sim demo). Ticks run in a worker; the canvas draws
          on the main thread via <code>selectRenderState</code>.
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
          <PlayPauseButton />
          <StopButton />
          <StepButton />
          <TickReadout />
        </div>
        <BoidsCanvasInner />
        <BoidsParamControls />
      </WorkerRenderSimulation>
    </div>
  );
}
