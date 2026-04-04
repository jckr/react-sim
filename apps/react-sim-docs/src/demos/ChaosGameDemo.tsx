import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { PlayPauseButton, StepButton, StopButton, TickReadout } from 'react-sim-react/control-primitives';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { ChaosData, ChaosParams, ChaosPoint, ChaosRenderState } from '../sims/chaosGameSim';

const moduleUrl = new URL('../sims/chaosGameSim.ts', import.meta.url).href;

const VERTEX_MIN = 3;
const VERTEX_MAX = 20;

function clampVertices(n: unknown): number {
  const v = Number(n);
  if (!Number.isFinite(v)) return 7;
  return Math.max(VERTEX_MIN, Math.min(VERTEX_MAX, Math.round(v)));
}

/** Keep a length-`n` bit string; pad with 1s, truncate if too long (must match `nbAttractors`). */
function normalizeRules(raw: string | undefined, n: number): string {
  const bits = (raw ?? '').replace(/[^01]/g, '');
  if (bits.length >= n) return bits.slice(0, n);
  return bits.padEnd(n, '1');
}

function ChaosVertexControls() {
  const { params, setParams } = useWorkerRenderSimulationContext<ChaosData, ChaosParams, ChaosRenderState, unknown>();
  const n = clampVertices(params.nbAttractors);
  const rules = normalizeRules(params.rules, n);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, flexWrap: 'wrap' }}>
        <span style={{ minWidth: 120 }}>Vertices</span>
        <select
          value={n}
          onChange={(e) => {
            const nb = clampVertices(Number(e.target.value));
            setParams({ nbAttractors: nb, rules: '1'.repeat(nb) }, { reset: true });
          }}
          style={{ minWidth: 64, padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.2)' }}
        >
          {Array.from({ length: VERTEX_MAX - VERTEX_MIN + 1 }, (_, i) => VERTEX_MIN + i).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span style={{ fontSize: 12, color: '#666' }}>Changing count resets the run (all vertices on).</span>
      </label>
      <div style={{ fontSize: 12, color: '#555' }}>Include vertices in the random move (at least one should be on)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {rules.split('').map((ch, i) => (
          <label
            key={`rule-${n}-${i}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13 }}
          >
            <input
              type="checkbox"
              checked={ch === '1'}
              onChange={() => {
                const next =
                  rules.slice(0, i) + (ch === '1' ? '0' : '1') + rules.slice(i + 1);
                setParams({ rules: next });
              }}
            />
            {i + 1}
          </label>
        ))}
      </div>
    </div>
  );
}

function ChaosCanvasInner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { data, tick, params } = useWorkerRenderSimulationContext<ChaosData, ChaosParams, ChaosRenderState, unknown>();

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    if (!data) return;

    const { height, width, r } = params;
    if (el.width !== width) el.width = width;
    if (el.height !== height) el.height = height;

    ctx.globalAlpha = 1;
    ctx.fillStyle = data.background;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = data.color;
    ctx.globalAlpha = 0.8;

    const pts: ChaosPoint[] = data.points;
    const n = Math.min(tick, pts.length);
    for (let i = 0; i < n; i++) {
      const p = pts[i];
      if (!p) break;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [data, params.height, params.width, params.r, tick]);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
        <PlayPauseButton />
        <StopButton />
        <StepButton />
        <TickReadout />
      </div>

      <ChaosVertexControls />

      <canvas
        ref={canvasRef}
        style={{
          marginTop: 12,
          width: 'min(100%, 360px)',
          height: 'auto',
          border: '1px solid rgba(0,0,0,0.12)',
          borderRadius: 8
        }}
      />
    </>
  );
}

export function ChaosGameDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <WorkerRenderSimulation<ChaosData, ChaosParams, ChaosRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
        config={{
          initialParams: {
            height: 332,
            width: 332,
            nbAttractors: 7,
            r: 1,
            rules: '1001100'
          },
          minTime: 0,
          maxTime: 20000,
          delayMs: 0,
          ticksPerAnimation: 100,
          loop: false,
          noCache: true,
          context: null
        }}
      >
        <ChaosCanvasInner />
      </WorkerRenderSimulation>
    </div>
  );
}
