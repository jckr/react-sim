import React from 'react';
import { GameOfLifeDemo } from '../../demos/GameOfLifeDemo';

export function GameOfLifePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Game of Life</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Conway&apos;s Game of Life on a DOM grid — simulation runs on the main thread (<code>Simulation</code>).
      </p>
      <GameOfLifeDemo />
    </div>
  );
}
