import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { EpidemicData, EpidemicParams, EpidemicRenderState } from '../sims/epidemicSim';

const COLORS: Record<string, string> = {
  sick: '#4f8c9d',
  recovered: '#add51f',
  healthy: '#997cfb',
  dead: '#6a9012'
};

const moduleUrl = new URL('../sims/epidemicSim.ts', import.meta.url).href;

function EpidemicInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const didAutoPlayRef = React.useRef(false);
  const { data, tick, params, play, canPlay } = useWorkerRenderSimulationContext<
    EpidemicData,
    EpidemicParams,
    EpidemicRenderState,
    unknown
  >();

  /** Worker + engine start paused; without this, tick never advances and the field looks frozen. */
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
    const r = params.r;
    if (el.width !== width) el.width = width;
    if (el.height !== height) el.height = height;
    ctx.fillStyle = '#fff';
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);
    const agents = data?.agents;
    if (!agents) return;
    agents.forEach((agent) => {
      ctx.beginPath();
      ctx.fillStyle = COLORS[agent.status] ?? '#333';
      ctx.arc(agent.x, agent.y, r, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    });
  }, [data, params.height, params.width, params.r, tick]);

  return (
    <>
      <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
        Dots move and collide; sick (teal) spread to healthy (purple). The run starts automatically — use Pause / Step as needed.
      </p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
        <PlayPauseButton />
        <StopButton />
        <StepButton />
        <TickReadout />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, fontFamily: 'monospace', marginBottom: 8 }}>
        <span style={{ color: COLORS.healthy }}>healthy: {data?.healthy ?? '—'}</span>
        <span style={{ color: COLORS.sick }}>sick: {data?.sick ?? '—'}</span>
        <span style={{ color: COLORS.recovered }}>recovered: {data?.recovered ?? '—'}</span>
        <span style={{ color: COLORS.dead }}>dead: {data?.dead ?? '—'}</span>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: '332px',
          height: '332px',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 8
        }}
      />
    </>
  );
}

export function EpidemicDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<EpidemicData, EpidemicParams, EpidemicRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            nbAgents: 220,
            nbSick: 18,
            contaminationRisk: 1,
            deathRisk: 0.001,
            maxSpeed: 7,
            recoveryTicks: 200,
            nbDistancing: 0,
            r: 3.5,
            height: 332,
            width: 332
          },
          minTime: 0,
          maxTime: 500,
          delayMs: 0,
          ticksPerAnimation: 4,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <EpidemicInner />
      </WorkerRenderSimulation>
    </div>
  );
}
