import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import fibonacciSpiralSim, { drawFibonacciSpiral } from '../sims/fibonacciSpiralSim';

function SpiralCanvas() {
  const { data, params, tick } = useSimulation<typeof fibonacciSpiralSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;
    drawFibonacciSpiral(ctx, { size: params.size, tick });
  }, [data, params, tick]);

  return (
    <canvas
      ref={canvasRef}
      width={params.size}
      height={params.size}
      style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6 }}
    />
  );
}

export function FibonacciSpiralDemo() {
  return (
    <Simulation sim={fibonacciSpiralSim} maxTime={30} delayMs={200}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={30}
          showStepButton
        />
        <SpiralCanvas />
      </div>
    </Simulation>
  );
}
