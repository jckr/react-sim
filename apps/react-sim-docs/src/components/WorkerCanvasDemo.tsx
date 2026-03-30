import React from 'react';
import { createEngineWorkerHost } from 'react-sim-engine/worker';

type Snapshot = {
  data: number[];
  tick: number;
  params: { cells: number; density: number };
  results: unknown[];
  isPlaying: boolean;
  canPlay: boolean;
};

export function WorkerCanvasDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const apiRef = React.useRef<Awaited<ReturnType<typeof createEngineWorkerHost>> | null>(null);
  const [apiReady, setApiReady] = React.useState(false);

  const [snapshot, setSnapshot] = React.useState<Snapshot | null>(null);

  React.useEffect(() => {
    const worker = new Worker(new URL('../workers/engineWorker.ts', import.meta.url), {
      type: 'module'
    });

    const initDataSource = `(params) => Array.from({ length: params.cells }, () => (Math.random() < params.density ? 1 : 0))`;
    const updateDataSource = `({ data, params }) => {
      const n = params.cells;
      const next = new Array(n);
      for (let i = 0; i < n; i++) {
        const left = data[(i - 1 + n) % n];
        const right = data[(i + 1) % n];
        next[i] = (left ^ right);
      }
      return { status: 'continue', data: next };
    }`;

    (async () => {
      const api = await createEngineWorkerHost(
        worker,
        {
          initialParams: { cells: 240, density: 0.35 },
          minTime: 0,
          delayMs: 48,
          ticksPerAnimation: 1,
          loop: false,
          noCache: true,
          initDataSource,
          updateDataSource,
          context: null
        },
        (snap) => {
          setSnapshot(snap as Snapshot);
        }
      );

      apiRef.current = api;
      setApiReady(true);
      api.play();
    })();

    return () => {
      worker.terminate();
    };
  }, []);

  React.useEffect(() => {
    if (!snapshot) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cells } = snapshot.params;
    canvas.width = cells;
    canvas.height = 56;

    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#111';
    const h = canvas.height;
    for (let i = 0; i < cells; i++) {
      if (snapshot.data[i]) {
        ctx.fillRect(i, 0, 1, h);
      }
    }
  }, [snapshot]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>
        <p style={{ margin: '0 0 8px' }}>
          This runs <strong>initData</strong> and <strong>updateData</strong> inside a Web Worker (via comlink). The main
          thread only receives snapshots and draws this canvas — so the pattern matches “heavy simulation off-thread,
          cheap render on-thread.”
        </p>
        <p style={{ margin: 0 }}>
          Rule: 1D ring, each cell becomes <code>left XOR right</code> (boundary wraps). Dark = 1, light = 0. The line
          evolves left→right in time; <strong>tick</strong> counts discrete generations.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => (snapshot?.isPlaying ? apiRef.current?.pause() : apiRef.current?.play())}
          disabled={!apiReady}
        >
          {snapshot?.isPlaying ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={() => apiRef.current?.stop()} disabled={!apiReady}>
          Stop
        </button>
        <span style={{ fontFamily: 'monospace', opacity: 0.85 }}>
          tick: {snapshot?.tick ?? '…'} · cells: {snapshot?.params.cells ?? '…'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, opacity: 0.75 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: '#111', borderRadius: 2 }} /> 1
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, background: '#f6f6f6', border: '1px solid #ccc', borderRadius: 2 }} /> 0
        </span>
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
    </div>
  );
}
