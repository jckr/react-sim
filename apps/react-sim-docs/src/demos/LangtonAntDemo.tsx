import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import langtonAntSim from '../sims/langtonAntSim';

function LangtonCanvas() {
  const { data, params } = useSimulation<typeof langtonAntSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    const { gridWidth: gw, gridHeight: gh, cells, antX, antY } = data;
    const cellW = params.width / gw;
    const cellH = params.height / gh;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, params.width, params.height);

    ctx.fillStyle = '#111';
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        if (cells[y * gw + x]) {
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
      }
    }

    // Draw ant
    ctx.fillStyle = '#e53935';
    ctx.fillRect(antX * cellW, antY * cellH, cellW, cellH);
  }, [data, params]);

  return (
    <canvas
      ref={canvasRef}
      width={params.width}
      height={params.height}
      style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6 }}
    />
  );
}

export function LangtonAntDemo() {
  return (
    <Simulation sim={langtonAntSim} maxTime={50000} delayMs={0} ticksPerFrame={10}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={50000}
          showStepButton
        />
        <LangtonCanvas />
      </div>
    </Simulation>
  );
}
