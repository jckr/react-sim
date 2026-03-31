import React from 'react';
import { SegregationDemo } from '../../demos/SegregationDemo';

export function SegregationPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Segregation (worker)</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Simulation + canvas rendering run in a worker using OffscreenCanvas; the main thread only renders surrounding UI.
      </p>
      <SegregationDemo />
    </div>
  );
}
