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
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A perfect maze is a diagram where cells can be linked with paths, and there is a unique
        path between any two cells. The data structure is a spanning tree. We create the maze
        using depth-first search: start from one cell, randomly connect unvisited neighbors,
        backtrack when stuck, until every cell is visited. This works with square, hexagonal,
        triangular, and circular grids.
      </p>
      <MazeDemo />
    </div>
  );
}
