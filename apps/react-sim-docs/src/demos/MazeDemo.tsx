import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import mazeSim from '../sims/mazeSim';
import type { MazeGridKind } from '../sims/mazeSim';
import { drawMazeFrame } from '../sims/mazeCanvas';

const GRID_OPTIONS: { value: MazeGridKind; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'hexagonal', label: 'Hexagonal' },
  { value: 'triangular', label: 'Triangular' },
  { value: 'circle', label: 'Circle' },
];

function GridTypeSelector() {
  const { params, resetWith } = useSimulation<typeof mazeSim>();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <span style={{ minWidth: 120, opacity: 0.9, fontSize: 13 }}>
        Grid type
      </span>
      {GRID_OPTIONS.map((opt) => (
        <label
          key={opt.value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <input
            type="radio"
            name="maze-grid-type"
            value={opt.value}
            checked={params.grid === opt.value}
            onChange={() => resetWith({ grid: opt.value })}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function MazeCanvas() {
  const { data, params, tick } = useSimulation<typeof mazeSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const lastDrawnTickRef = React.useRef(-1);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    if (tick === 0) {
      // Full redraw on init/reset
      lastDrawnTickRef.current = -1;
    }

    // Draw all links since last render.
    // drawMazeFrame draws links[tick - ticksPerAnimation .. tick-1],
    // so we set ticksPerAnimation to cover everything since lastDrawnTick.
    const gap = tick - lastDrawnTickRef.current;
    const overrideParams = { ...params, ticksPerAnimation: gap };
    drawMazeFrame({
      ctx,
      pixelWidth: params.width,
      pixelHeight: params.height,
      tick,
      params: overrideParams,
      data,
    });
    lastDrawnTickRef.current = tick;
  }, [data, params, tick]);

  return (
    <canvas
      ref={canvasRef}
      width={params.width}
      height={params.height}
      style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6 }}
    />
  );
}

export function MazeDemo() {
  return (
    <Simulation sim={mazeSim} maxTime={50000} delayMs={10}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={50000}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'ticksPerAnimation',
              label: 'Ticks per frame',
              min: 1,
              max: 50,
              step: 1,
            },
            {
              type: 'toggle',
              param: 'drawItem',
              label: 'Draw cells',
            },
          ]}
        />
        <GridTypeSelector />
        <MazeCanvas />
      </div>
    </Simulation>
  );
}
