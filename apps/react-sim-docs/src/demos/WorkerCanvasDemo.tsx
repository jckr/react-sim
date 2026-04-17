import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import xorRingSim from '../sims/xorRingSim';

const ROW_HEIGHT = 1;

function XorRingCanvas() {
  const { data, params, tick } = useSimulation<typeof xorRingSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const maxRows = 200;

  // Accumulate history for visual stacking
  const historyRef = React.useRef<number[][]>([]);

  React.useEffect(() => {
    if (tick === 0) {
      historyRef.current = [];
    }
    if (data) {
      // Only push if this is a new tick
      if (historyRef.current.length <= tick) {
        historyRef.current.push([...data]);
      }
      // Keep only the last maxRows
      if (historyRef.current.length > maxRows) {
        historyRef.current = historyRef.current.slice(-maxRows);
      }
    }
  }, [tick, data]);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    const { cells } = params;
    const rows = historyRef.current;
    const h = rows.length * ROW_HEIGHT;

    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, cells, maxRows * ROW_HEIGHT);

    ctx.fillStyle = '#111';
    rows.forEach((row, rowIdx) => {
      for (let i = 0; i < cells; i++) {
        if (row[i]) {
          ctx.fillRect(i, rowIdx * ROW_HEIGHT, 1, ROW_HEIGHT);
        }
      }
    });
  }, [data, params, tick]);

  return (
    <canvas
      ref={canvasRef}
      width={params.cells}
      height={maxRows * ROW_HEIGHT}
      style={{
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: 6,
        width: '100%',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export function WorkerCanvasDemo() {
  return (
    <Simulation sim={xorRingSim} maxTime={5000} delayMs={50}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={5000}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'cells',
              label: 'Cells',
              min: 50,
              max: 500,
              step: 10,
            },
            {
              type: 'range',
              param: 'density',
              label: 'Initial density',
              min: 0,
              max: 1,
              step: 0.05,
            },
          ]}
        />
        <XorRingCanvas />
      </div>
    </Simulation>
  );
}
