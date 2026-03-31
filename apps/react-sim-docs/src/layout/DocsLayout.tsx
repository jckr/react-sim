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
          <NavLink to="/guide/basic-blocks" style={linkStyle}>
            Basic blocks
          </NavLink>

          <div style={sectionTitle}>Examples</div>
          <NavLink to="/examples/counter" style={linkStyle}>
            Counter
          </NavLink>
          <NavLink to="/examples/worker-canvas" style={linkStyle}>
            Worker canvas
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
