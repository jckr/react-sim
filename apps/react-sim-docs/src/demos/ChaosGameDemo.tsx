import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import chaosGameSim from '../sims/chaosGameSim';

function RulesToggle() {
  const { params, setParams } = useSimulation<typeof chaosGameSim>();
  const { nbAttractors, rules } = params;
  const padded = rules.padEnd(nbAttractors, '1').slice(0, nbAttractors);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, color: '#555' }}>Vertex rules</span>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
        {[...Array(nbAttractors).keys()].map((i) => {
          const on = padded[i] === '1';
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                const chars = padded.split('');
                chars[i] = on ? '0' : '1';
                setParams({ rules: chars.join('') });
              }}
              style={{
                minWidth: 36,
                height: 32,
                borderRadius: 6,
                border: '1px solid rgba(0,0,0,0.2)',
                background: on ? '#4a90d9' : '#e0e0e0',
                color: on ? '#fff' : '#666',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChaosCanvas() {
  const { data, params } = useSimulation<typeof chaosGameSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawnCountRef = React.useRef(0);

  // Reset drawn count when background changes (new init)
  const bgRef = React.useRef(data?.background);
  React.useEffect(() => {
    if (data && data.background !== bgRef.current) {
      drawnCountRef.current = 0;
      bgRef.current = data.background;
    }
  }, [data?.background]);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    const { points, background, color, attractors } = data;

    // Draw background on first frame or reset
    if (drawnCountRef.current === 0) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, params.width, params.height);

      // Draw attractor markers
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      attractors.forEach((a) => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw only new points
    ctx.fillStyle = color;
    for (let i = drawnCountRef.current; i < points.length; i++) {
      ctx.fillRect(points[i].x, points[i].y, 1, 1);
    }
    drawnCountRef.current = points.length;
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

export function ChaosGameDemo() {
  return (
    <Simulation sim={chaosGameSim} maxTime={100000} delayMs={0} ticksPerFrame={100}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={100000}
          controls={[
            {
              type: 'range',
              param: 'nbAttractors',
              label: 'Attractors',
              min: 3,
              max: 12,
              step: 1,
            },
            {
              type: 'range',
              param: 'r',
              label: 'Ratio',
              min: 0.1,
              max: 2,
              step: 0.05,
            },
          ]}
        />
        <RulesToggle />
        <ChaosCanvas />
      </div>
    </Simulation>
  );
}
