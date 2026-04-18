import React, { useEffect, useRef } from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import activatorsSim from '../sims/activatorsSim';

const CELL_PX = 10;

function ActivatorsCanvas() {
  const { data, params } = useSimulation<typeof activatorsSim>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const w = params.width * CELL_PX;
  const h = params.height * CELL_PX;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    for (let row = 0; row < data.grid.length; row++) {
      for (let col = 0; col < data.grid[row].length; col++) {
        ctx.fillStyle = data.grid[row][col] ? '#1a1a1a' : '#f3f3f3';
        ctx.fillRect(col * CELL_PX, row * CELL_PX, CELL_PX, CELL_PX);
      }
    }
  }, [data, w, h]);

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      style={{ border: '1px solid rgba(0,0,0,0.2)', borderRadius: 6 }}
    />
  );
}

export function ActivatorsDemo() {
  return (
    <Simulation sim={activatorsSim} maxTime={200} delayMs={100}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={200}
          showStepButton
          controls={[
            {
              type: 'range',
              param: 'innerRadius',
              label: 'Inner Radius',
              min: 1,
              max: 10,
              step: 1,
            },
            {
              type: 'range',
              param: 'outerRadius',
              label: 'Outer Radius',
              min: 1,
              max: 10,
              step: 1,
            },
            {
              type: 'range',
              param: 'w',
              label: 'Weight',
              min: 0,
              max: 1,
              step: 0.01,
            },
            {
              type: 'range',
              param: 'density',
              label: 'Density',
              min: 0,
              max: 1,
              step: 0.1,
            },
          ]}
        />
        <ActivatorsCanvas />
      </div>
    </Simulation>
  );
}
