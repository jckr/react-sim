import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const linkStyle = ({
  isActive,
}: {
  isActive: boolean;
}): React.CSSProperties => ({
  display: 'block',
  padding: '6px 10px',
  borderRadius: 6,
  textDecoration: 'none',
  color: isActive ? '#0b57d0' : '#1f1f1f',
  background: isActive ? 'rgba(11, 87, 208, 0.08)' : 'transparent',
  fontWeight: isActive ? 600 : 400,
});

const indentedLink = ({
  isActive,
}: {
  isActive: boolean;
}): React.CSSProperties => ({
  ...linkStyle({ isActive }),
  paddingLeft: 22,
  fontSize: 13,
});

const sectionTitle: React.CSSProperties = {
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#666',
  margin: '16px 0 8px',
  paddingLeft: 10,
};

function NavGroup({
  label,
  prefix,
  children,
}: {
  label: string;
  prefix: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(prefix);
  const [open, setOpen] = React.useState(isActive);

  // Auto-open when navigating into this group
  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <div>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          width: '100%',
          padding: '6px 10px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: 14,
          color: isActive ? '#0b57d0' : '#1f1f1f',
          fontWeight: isActive ? 600 : 400,
          borderRadius: 6,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 12,
            fontSize: 10,
            transition: 'transform 0.15s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          {'\u25B6'}
        </span>
        {label}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export function DocsLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        color: '#1a1a1a',
      }}
    >
      <aside
        style={{
          width: 260,
          flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.08)',
          padding: '20px 12px',
          background: '#fafafa',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: '0 10px 16px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <NavLink
            to='/'
            end
            style={{ textDecoration: 'none', color: '#111' }}
          >
            <strong style={{ fontSize: 15 }}>react-sim</strong>
          </NavLink>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            Docs &amp; examples
          </div>
        </div>

        <nav style={{ marginTop: 8 }}>
          <div style={sectionTitle}>Guide</div>
          <NavLink to='/guide/getting-started' style={linkStyle}>
            Getting started
          </NavLink>
          <NavLink to='/guide/tutorial' style={linkStyle}>
            Tutorial
          </NavLink>
          <NavLink to='/guide/defining-a-sim' style={linkStyle}>
            Defining a simulation
          </NavLink>
          <NavLink to='/guide/simulation-component' style={linkStyle}>
            Simulation component
          </NavLink>
          <NavLink to='/guide/using-the-hook' style={linkStyle}>
            Using the hook
          </NavLink>
          <NavLink to='/guide/controls' style={linkStyle}>
            Controls
          </NavLink>

          <div style={sectionTitle}>API Reference</div>
          <NavLink to='/api/define-sim' style={linkStyle}>
            defineSim
          </NavLink>
          <NavLink to='/api/simulation' style={linkStyle}>
            {'<Simulation>'}
          </NavLink>
          <NavLink to='/api/use-simulation' style={linkStyle}>
            useSimulation
          </NavLink>
          <NavLink to='/api/controls' style={linkStyle}>
            Controls
          </NavLink>
          <NavLink to='/api/create-engine' style={linkStyle}>
            createEngine
          </NavLink>

          <div style={sectionTitle}>Examples</div>
          <NavGroup label='Simple' prefix='/examples/counter'>
            <NavLink to='/examples/counter' style={indentedLink}>
              Counter
            </NavLink>
            <NavLink to='/examples/fibonacci' style={indentedLink}>
              Fibonacci
            </NavLink>
            <NavLink to='/examples/fibonacci-spiral' style={indentedLink}>
              Fibonacci spiral
            </NavLink>
            <NavLink to='/examples/dice' style={indentedLink}>
              Dice
            </NavLink>
            <NavLink to='/examples/simple-model' style={indentedLink}>
              Simple model
            </NavLink>
          </NavGroup>
          <NavGroup label='Grid simulations' prefix='/examples/game'>
            <NavLink to='/examples/game-of-life' style={indentedLink}>
              Game of Life
            </NavLink>
            <NavLink to='/examples/automata-1d' style={indentedLink}>
              1D automata
            </NavLink>
            <NavLink to='/examples/percolation' style={indentedLink}>
              Percolation
            </NavLink>
            <NavLink to='/examples/activators' style={indentedLink}>
              Activators
            </NavLink>
            <NavLink to='/examples/langton-ant' style={indentedLink}>
              {"Langton's ant"}
            </NavLink>
            <NavLink to='/examples/segregation' style={indentedLink}>
              Segregation
            </NavLink>
            <NavLink to='/examples/segregation-local' style={indentedLink}>
              Segregation (local)
            </NavLink>
          </NavGroup>
          <NavGroup label='Canvas simulations' prefix='/examples/boids'>
            <NavLink to='/examples/boids' style={indentedLink}>
              Boids
            </NavLink>
            <NavLink to='/examples/snake' style={indentedLink}>
              Snake
            </NavLink>
            <NavLink to='/examples/mazes' style={indentedLink}>
              Mazes
            </NavLink>
            <NavLink to='/examples/epidemic' style={indentedLink}>
              Epidemic
            </NavLink>
            <NavLink to='/examples/chaos-game' style={indentedLink}>
              Chaos game
            </NavLink>
            <NavLink to='/examples/worker-canvas' style={indentedLink}>
              XOR ring
            </NavLink>
          </NavGroup>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 28, maxWidth: 920 }}>
        <Outlet />
      </main>
    </div>
  );
}
