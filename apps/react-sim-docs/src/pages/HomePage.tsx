import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>react-sim</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Modernized simulation building blocks: a pure TypeScript engine, a thin React adapter, and worker-friendly
        patterns.
      </p>

      <h2 style={{ marginTop: 24, marginBottom: 8 }}>Get started</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <Link to="/guide/basic-blocks">Basic blocks</Link>
        </li>
      </ul>

      <h2 style={{ marginTop: 24, marginBottom: 8 }}>Examples</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <Link to="/examples/counter">Counter</Link> — in-thread simulation + controls
        </li>
        <li>
          <Link to="/examples/worker-canvas">Worker canvas</Link> — worker + OffscreenCanvas
        </li>
        <li>
          <Link to="/examples/segregation">Segregation</Link> — worker + canvas + time series
        </li>
        <li>
          <Link to="/examples/segregation-local">Segregation (local)</Link> — same business logic, no worker
        </li>
      </ul>
    </div>
  );
}
