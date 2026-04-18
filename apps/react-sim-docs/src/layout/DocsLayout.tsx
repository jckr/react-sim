import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  display: 'block',
  padding: '6px 10px',
  borderRadius: 6,
  textDecoration: 'none',
  color: isActive ? '#0b57d0' : '#1f1f1f',
  background: isActive ? 'rgba(11, 87, 208, 0.08)' : 'transparent',
  fontWeight: isActive ? 600 : 400
});

const sectionTitle: React.CSSProperties = {
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#666',
  margin: '16px 0 8px',
  paddingLeft: 10
};

export function DocsLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        color: '#1a1a1a'
      }}
    >
      <aside
        style={{
          width: 260,
          flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.08)',
          padding: '20px 12px',
          background: '#fafafa'
        }}
      >
        <div style={{ padding: '0 10px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <NavLink to="/" end style={{ textDecoration: 'none', color: '#111' }}>
            <strong style={{ fontSize: 15 }}>react-sim</strong>
          </NavLink>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Docs & examples</div>
        </div>

        <nav style={{ marginTop: 8 }}>
          <div style={sectionTitle}>Guide</div>
          <NavLink to="/guide/getting-started" style={linkStyle}>
            Getting started
          </NavLink>
          <NavLink to="/guide/defining-a-sim" style={linkStyle}>
            Defining a simulation
          </NavLink>
          <NavLink to="/guide/simulation-component" style={linkStyle}>
            Simulation component
          </NavLink>
          <NavLink to="/guide/using-the-hook" style={linkStyle}>
            Using the hook
          </NavLink>
          <NavLink to="/guide/controls" style={linkStyle}>
            Controls
          </NavLink>

          <div style={sectionTitle}>Examples</div>
          <NavLink to="/examples/counter" style={linkStyle}>
            Counter
          </NavLink>
          <NavLink to="/examples/fibonacci" style={linkStyle}>
            Fibonacci
          </NavLink>
          <NavLink to="/examples/fibonacci-spiral" style={linkStyle}>
            Fibonacci spiral
          </NavLink>
          <NavLink to="/examples/dice" style={linkStyle}>
            Dice
          </NavLink>
          <NavLink to="/examples/game-of-life" style={linkStyle}>
            Game of Life
          </NavLink>
          <NavLink to="/examples/simple-model" style={linkStyle}>
            Simple model
          </NavLink>
          <NavLink to="/examples/automata-1d" style={linkStyle}>
            1D automata
          </NavLink>
          <NavLink to="/examples/percolation" style={linkStyle}>
            Percolation
          </NavLink>
          <NavLink to="/examples/activators" style={linkStyle}>
            Activators
          </NavLink>
          <NavLink to="/examples/worker-canvas" style={linkStyle}>
            XOR ring
          </NavLink>
          <NavLink to="/examples/chaos-game" style={linkStyle}>
            Chaos game
          </NavLink>
          <NavLink to="/examples/langton-ant" style={linkStyle}>
            {"Langton's ant"}
          </NavLink>
          <NavLink to="/examples/boids" style={linkStyle}>
            Boids
          </NavLink>
          <NavLink to="/examples/snake" style={linkStyle}>
            Snake
          </NavLink>
          <NavLink to="/examples/mazes" style={linkStyle}>
            Mazes
          </NavLink>
          <NavLink to="/examples/epidemic" style={linkStyle}>
            Epidemic
          </NavLink>
          <NavLink to="/examples/segregation" style={linkStyle}>
            Segregation
          </NavLink>
          <NavLink to="/examples/segregation-local" style={linkStyle}>
            Segregation (local)
          </NavLink>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 28, maxWidth: 920 }}>
        <Outlet />
      </main>
    </div>
  );
}
