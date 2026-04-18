import React from 'react';
import { BoidsDemo } from '../../demos/BoidsDemo';

export function BoidsPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Boids</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Boids is one of the best-known agent simulations in computer graphics. Boid agents move
        in a plane governed by three forces: alignment (move in the same direction as nearby
        boids), cohesion (move towards nearby boids), and separation (avoid nearby boids). Their
        movement is reminiscent of a flock of birds. Each force can be parameterized: the
        coefficient controls how much it affects movement, and the radius sets the maximum
        distance at which neighbors are considered.
      </p>
      <BoidsDemo />
    </div>
  );
}
