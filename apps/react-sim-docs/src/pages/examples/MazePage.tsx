import React from 'react';
import { MazeDemo } from '../../demos/MazeDemo';

export function MazePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Mazes</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Maze generation on square, hexagonal, triangular, and circular tilings (original react-sim site). Simulation runs
        in a worker; rendering uses <code>selectRenderState</code> on the main thread.
      </p>
      <MazeDemo />
    </div>
  );
}
