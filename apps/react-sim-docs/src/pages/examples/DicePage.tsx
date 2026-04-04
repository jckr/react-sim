import React from 'react';
import { DiceDemo } from '../../demos/DiceDemo';

export function DicePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dice</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Roll several dice each tick and watch the running distribution — main-thread <code>Simulation</code>.
      </p>
      <DiceDemo />
    </div>
  );
}
