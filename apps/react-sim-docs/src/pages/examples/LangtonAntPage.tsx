import React from 'react';
import { LangtonAntDemo } from '../../demos/LangtonAntDemo';

export function LangtonAntPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Langton's ant</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Classic 2-state Turing ant on a toroidal grid. Simulation ticks run in a Web Worker; rendering uses{' '}
        <code>selectRenderState</code> and draws on the main thread.
      </p>
      <LangtonAntDemo />
    </div>
  );
}
