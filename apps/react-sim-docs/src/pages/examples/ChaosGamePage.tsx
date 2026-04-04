import React from 'react';
import { ChaosGameDemo } from '../../demos/ChaosGameDemo';

export function ChaosGamePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Chaos game</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Chaos game on canvas — ticks run in a worker; rendering uses <code>selectRenderState</code> and draws on the main
        thread.
      </p>
      <ChaosGameDemo />
    </div>
  );
}
