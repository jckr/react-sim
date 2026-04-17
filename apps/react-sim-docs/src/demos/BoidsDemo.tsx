import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import boidsSim from '../sims/boidsSim';

function BoidsCanvas() {
  const { data, params } = useSimulation<typeof boidsSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    ctx.clearRect(0, 0, params.width, params.height);
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, params.width, params.height);

    data.forEach((boid) => {
      const [px, py] = boid.position;
      const angle = boid.angle;
      const r = params.r;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);

      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.moveTo(r * 2, 0);
      ctx.lineTo(-r, -r);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.fill();

      if (params.showCircles) {
        ctx.globalAlpha = 0.2;

        // Separation radius — red
        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        ctx.arc(0, 0, params.separationDistance, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // Alignment radius — green
        ctx.strokeStyle = '#0f0';
        ctx.beginPath();
        ctx.arc(0, 0, params.alignmentDistance, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // Cohesion radius — blue
        ctx.strokeStyle = '#00f';
        ctx.beginPath();
        ctx.arc(0, 0, params.cohesionDistance, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      ctx.restore();
    });
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

const sectionLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 13,
  opacity: 0.6,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginTop: 4,
};

export function BoidsDemo() {
  return (
    <Simulation sim={boidsSim} maxTime={10000} delayMs={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={10000}
          controls={[
            {
              type: 'range',
              param: 'nbBoids',
              label: 'Number of boids',
              min: 10,
              max: 200,
              step: 5,
            },
            // -- Alignment --
            {
              type: 'range',
              param: 'alignmentCoefficient',
              label: 'Alignment',
              min: 0,
              max: 3,
              step: 0.01,
            },
            {
              type: 'range',
              param: 'alignmentDistance',
              label: 'Alignment radius',
              min: 0,
              max: 50,
              step: 1,
            },
            // -- Cohesion --
            {
              type: 'range',
              param: 'cohesionCoefficient',
              label: 'Cohesion',
              min: 0,
              max: 3,
              step: 0.01,
            },
            {
              type: 'range',
              param: 'cohesionDistance',
              label: 'Cohesion radius',
              min: 0,
              max: 50,
              step: 1,
            },
            // -- Separation --
            {
              type: 'range',
              param: 'separationCoefficient',
              label: 'Separation',
              min: 0,
              max: 3,
              step: 0.01,
            },
            {
              type: 'range',
              param: 'separationDistance',
              label: 'Separation radius',
              min: 0,
              max: 50,
              step: 1,
            },
            // -- Display --
            {
              type: 'toggle',
              param: 'showCircles',
              label: 'Show radius circles',
            },
          ]}
        />
        <BoidsCanvas />
      </div>
    </Simulation>
  );
}
