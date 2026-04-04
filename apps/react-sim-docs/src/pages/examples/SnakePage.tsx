import React from 'react';
import { SnakeDemo } from '../../demos/SnakeDemo';

export function SnakePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Snake</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Pathfinding snake that grows when it eats fruit. From the original react-sim site; simulation runs in a worker,
        rendering uses <code>selectRenderState</code> on the main thread.
      </p>
      <SnakeDemo />
    </div>
  );
}
