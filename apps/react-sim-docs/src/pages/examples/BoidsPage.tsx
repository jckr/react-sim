import React from 'react';
import { BoidsDemo } from '../../demos/BoidsDemo';

export function BoidsPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Boids</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Classic flocking simulation from the original react-sim site: each boid applies separation, alignment, and cohesion
        within configurable radii. Simulation ticks run in a Web Worker; rendering uses <code>selectRenderState</code> on
        the main thread.
      </p>
      <BoidsDemo />
    </div>
  );
}
