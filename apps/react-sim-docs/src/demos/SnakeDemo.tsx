import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import snakeSim from '../sims/snakeSim';
import { drawSnakeFrame } from '../sims/snakeCanvas';

type SpeedSetting = 'normal' | 'fast' | 'very fast';

const SPEED_CONFIG: Record<SpeedSetting, { delayMs: number; ticksPerFrame: number }> = {
  normal: { delayMs: 100, ticksPerFrame: 1 },
  fast: { delayMs: 0, ticksPerFrame: 1 },
  'very fast': { delayMs: 0, ticksPerFrame: 20 },
};

function SnakeCanvas() {
  const { data, params } = useSimulation<typeof snakeSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const pixelWidth = params.width * params.cellSize;
  const pixelHeight = params.height * params.cellSize;

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;
    drawSnakeFrame({
      ctx,
      pixelWidth,
      pixelHeight,
      cellSize: params.cellSize,
      cols: params.width,
      rows: params.height,
      displayGrid: params.displayGrid,
      displayCircuit: params.displayCircuit,
      displayHead: params.displayHead,
      data,
    });
  }, [data, params, pixelWidth, pixelHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={pixelWidth}
      height={pixelHeight}
      style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6 }}
    />
  );
}

function SnakeCustomControls() {
  const { params, setParams } = useSimulation<typeof snakeSim>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontWeight: 500 }}>Display</label>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={params.displayHead}
            onChange={(e) => setParams({ displayHead: e.target.checked })}
          />
          Show head
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={params.displayGrid}
            onChange={(e) => setParams({ displayGrid: e.target.checked })}
          />
          Show grid
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={params.displayCircuit}
            onChange={(e) => setParams({ displayCircuit: e.target.checked })}
          />
          Show circuit
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={params.safeMode}
            onChange={(e) => setParams({ safeMode: e.target.checked })}
          />
          Safe mode
        </label>
      </div>
    </div>
  );
}

export function SnakeDemo() {
  const [speed, setSpeed] = React.useState<SpeedSetting>('normal');
  const { delayMs, ticksPerFrame } = SPEED_CONFIG[speed];

  return (
    <Simulation
      key={speed}
      sim={snakeSim}
      maxTime={10000}
      delayMs={delayMs}
      ticksPerFrame={ticksPerFrame}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={10000}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'width',
              label: 'Grid width',
              min: 6,
              max: 30,
              step: 1,
            },
            {
              type: 'range',
              param: 'height',
              label: 'Grid height',
              min: 6,
              max: 30,
              step: 1,
            },
          ]}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontWeight: 500 }}>Speed</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['normal', 'fast', 'very fast'] as SpeedSetting[]).map((s) => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="snake-speed"
                  checked={speed === s}
                  onChange={() => setSpeed(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
        <SnakeCustomControls />
        <SnakeCanvas />
      </div>
    </Simulation>
  );
}
