import React from 'react';
import { FibonacciSpiralDemo } from '../../demos/FibonacciSpiralDemo';

export function FibonacciSpiralPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Fibonacci spiral</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Golden spiral squares — ticks in a worker, canvas drawn on the main thread.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Because the Fibonacci ratio converges to the golden ratio, the sequence is associated
        with spirals. We draw squares of Fibonacci side lengths, rotating direction each time,
        and link their corners to form a golden spiral.
      </p>
      <FibonacciSpiralDemo />
    </div>
  );
}
