import React from 'react';
import { Simulation } from 'react-sim-react/simulation';
import { useSimulation } from 'react-sim-react/hooks';
import { StandardControls } from 'react-sim-react/controls';
import epidemicSim from '../sims/epidemicSim';

const STATUS_COLORS: Record<string, string> = {
  healthy: '#4caf50',
  sick: '#f44336',
  recovered: '#9e9e9e',
  dead: '#212121',
};

function EpidemicCanvas() {
  const { data, params } = useSimulation<typeof epidemicSim>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    ctx.clearRect(0, 0, params.width, params.height);
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, params.width, params.height);

    data.agents.forEach((agent) => {
      ctx.fillStyle = STATUS_COLORS[agent.status] ?? '#999';
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, params.r, 0, Math.PI * 2);
      ctx.fill();
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

function EpidemicStats() {
  const { data } = useSimulation<typeof epidemicSim>();
  if (!data) return null;

  const counts = [
    { label: 'Healthy', value: data.healthy, color: STATUS_COLORS.healthy },
    { label: 'Sick', value: data.sick, color: STATUS_COLORS.sick },
    { label: 'Recovered', value: data.recovered, color: STATUS_COLORS.recovered },
    { label: 'Dead', value: data.dead, color: STATUS_COLORS.dead },
  ];

  const total = data.healthy + data.sick + data.recovered + data.dead;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 16, fontSize: 14, fontFamily: 'monospace' }}>
        {counts.map(({ label, value, color }) => (
          <span key={label} style={{ color, fontWeight: 600 }}>
            {label}: {value}
          </span>
        ))}
      </div>
      {total > 0 && (
        <div
          style={{
            display: 'flex',
            height: 16,
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {counts.map(({ label, value, color }) =>
            value > 0 ? (
              <div
                key={label}
                style={{
                  width: `${(value / total) * 100}%`,
                  backgroundColor: color,
                  transition: 'width 0.1s ease',
                }}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}

export function EpidemicDemo() {
  return (
    <Simulation sim={epidemicSim} maxTime={5000} delayMs={50}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <StandardControls
          maxTime={5000}
          controls={[
            {
              type: 'range',
              param: 'nbAgents',
              label: 'Number of agents',
              min: 50,
              max: 400,
              step: 10,
            },
            {
              type: 'range',
              param: 'nbSick',
              label: 'Initially sick',
              min: 1,
              max: 50,
              step: 1,
            },
            {
              type: 'range',
              param: 'contaminationRisk',
              label: 'Contamination risk',
              min: 0,
              max: 1,
              step: 0.05,
            },
            {
              type: 'range',
              param: 'deathRisk',
              label: 'Death risk',
              min: 0,
              max: 0.05,
              step: 0.001,
            },
            {
              type: 'range',
              param: 'recoveryTicks',
              label: 'Recovery ticks',
              min: 50,
              max: 500,
              step: 10,
            },
            {
              type: 'range',
              param: 'maxSpeed',
              label: 'Max speed',
              min: 1,
              max: 15,
              step: 1,
            },
            {
              type: 'range',
              param: 'nbDistancing',
              label: 'Distancing agents',
              min: 0,
              max: 200,
              step: 10,
            },
          ]}
        />
        <EpidemicStats />
        <EpidemicCanvas />
      </div>
    </Simulation>
  );
}
