import React from 'react';
import { FibonacciDemo } from '../../demos/FibonacciDemo';

export function FibonacciPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Fibonacci numbers</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Fibonacci sequence built step by step — main-thread <code>Simulation</code> (DOM).
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        These examples are inspired by the Fibonacci sequence, where F&#8320; = 0, F&#8321; = 1,
        and F&#8345; = F&#8345;&#8331;&#8321; + F&#8345;&#8331;&#8322;. The ratio F&#8345; / F&#8345;&#8331;&#8321; converges
        to &phi;, the golden ratio.
      </p>
      <FibonacciDemo />
    </div>
  );
}
