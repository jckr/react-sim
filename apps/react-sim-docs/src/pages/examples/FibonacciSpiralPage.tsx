import React from 'react';
import { FibonacciSpiralDemo } from '../../demos/FibonacciSpiralDemo';

export function FibonacciSpiralPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Fibonacci spiral</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Golden spiral squares — ticks in a worker, canvas drawn on the main thread.
      </p>
      <FibonacciSpiralDemo />
    </div>
  );
}
