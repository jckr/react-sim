import React from 'react';
import { SegregationDemo } from '../../demos/SegregationDemo';

export function SegregationPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Segregation (worker)</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Simulation + canvas rendering run in a worker using OffscreenCanvas; the main thread only renders surrounding UI.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Based on{' '}
        <a href="https://en.wikipedia.org/wiki/Schelling%27s_model_of_segregation" target="_blank" rel="noopener noreferrer">
          Schelling&apos;s model of segregation
        </a>
        . A territory is randomly populated by two groups. Citizens have a tolerance
        level — if too many neighbors are from the other group, they swap with another unhappy
        citizen. At high tolerance, the territory stays mixed. At lower tolerance, homogeneous
        islands form. At the lowest tolerance, citizens never stabilize.
      </p>
      <SegregationDemo />
    </div>
  );
}
