import React from 'react';
import { FibonacciDemo } from '../../demos/FibonacciDemo';

export function FibonacciPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Fibonacci numbers</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Fibonacci sequence built step by step — main-thread <code>Simulation</code> (DOM).
      </p>
      <FibonacciDemo />
    </div>
  );
}
