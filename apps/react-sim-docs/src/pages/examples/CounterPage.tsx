import React from 'react';
import { CounterDemo } from '../../demos/CounterDemo';

export function CounterPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Counter</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Minimal in-thread simulation showing the engine contract and composable controls.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        The simplest possible simulation: a counter that increments each tick. Demonstrates the
        basic defineSim / Simulation / useSimulation pattern.
      </p>
      <CounterDemo />
    </div>
  );
}
