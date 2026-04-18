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
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        This model tries to win the game of Snake. The snake moves on a grid, eating fruit to
        grow. If it can stay on a circuit covering the entire grid, it can loop endlessly and
        never collide. But that&apos;s slow — so the snake optimizes. When it eats a fruit, it finds
        the quickest route to the new fruit, then the longest route from the fruit back to its
        tail. If this forms a complete circuit, the snake updates its path.
      </p>
      <SnakeDemo />
    </div>
  );
}
