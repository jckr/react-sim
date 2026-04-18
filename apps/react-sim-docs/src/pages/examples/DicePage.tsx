import React from 'react';
import { DiceDemo } from '../../demos/DiceDemo';

export function DicePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dice</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        This simulation throws dice and tallies the result over time. For one die, we expect
        roughly equal rolls for each value. For several dice, the bars follow a bell curve
        &mdash; but the actual shape can be quite different from the theoretical distribution.
        Random functions are not perfect.
      </p>
      <DiceDemo />
    </div>
  );
}
