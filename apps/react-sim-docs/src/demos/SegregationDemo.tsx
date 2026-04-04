import React from 'react';
import { WorkerRenderSimulation } from 'react-sim-react/worker-render-simulation';
import { StandardControls } from 'react-sim-react/controls';
import { useWorkerRenderSimulationContext } from 'react-sim-react/hooks';
import type { SegData, SegParams, SegRenderState } from '../sims/segregationSim';
import { defaultParams } from '../sims/segregationSim';
import { draw } from '../sims/segregationSim';

const moduleUrl = new URL('../sims/segregationSim.ts', import.meta.url).href;

type Point = { t: number; v: number };

function HappinessChart(props: { series: Point[]; tick: number }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const w = 330;
  const h = 72;

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
    if (props.series.length < 2) return;
    ctx.strokeStyle = '#0b57d0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    props.series.forEach((p, i) => {
      const x = (p.t / Math.max(props.tick, 1)) * (w - 16) + 8;
      const y = h - 8 - p.v * (h - 16);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [props.series, props.tick]);

  return (
    <div>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>Happiness over time</div>
      <canvas ref={ref} width={w} height={h} style={{ width: '100%', maxWidth: w, borderRadius: 6 }} />
    </div>
  );
}

export function SegregationDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [series, setSeries] = React.useState<Point[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <canvas
        ref={canvasRef}
        width={defaultParams.width}
        height={defaultParams.height}
        style={{ borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)' }}
      />

      <WorkerRenderSimulation<SegData, SegParams, SegRenderState, unknown>
        module={{ kind: 'url', url: moduleUrl }}
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
      >
        <SegregationInner canvasRef={canvasRef} series={series} setSeries={setSeries} />
      </WorkerRenderSimulation>
    </div>
  );
}

function SegregationInner(props: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  series: Point[];
  setSeries: React.Dispatch<React.SetStateAction<Point[]>>;
}) {
  const { data, tick, isPlaying, params } = useWorkerRenderSimulationContext<SegData, SegParams, SegRenderState, unknown>();

  React.useEffect(() => {
    const el = props.canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    if (!data) return;

    draw({
      ctx,
      snapshot: {
        data: { grid: data.grid, happy: 0, happiness: data.happiness, totalMoves: 0 },
        params
      }
    });
  }, [data, params, props.canvasRef, tick]);

  React.useEffect(() => {
    if (tick === 0 && !isPlaying) props.setSeries([]);
  }, [isPlaying, props, tick]);

  React.useEffect(() => {
    const v = typeof data?.happiness === 'number' ? data.happiness : null;
    if (v === null) return;
    props.setSeries((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.t === tick) return prev;
      const next = prev.concat({ t: tick, v });
      return next.length > 300 ? next.slice(next.length - 300) : next;
    });
  }, [data?.happiness, props, tick]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

      <HappinessChart series={props.series} tick={tick} />
    </div>
  );
}
