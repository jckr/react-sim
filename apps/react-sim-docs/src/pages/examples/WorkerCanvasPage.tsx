import React from 'react';
import { WorkerCanvasDemo } from '../../demos/WorkerCanvasDemo';

export function WorkerCanvasPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Worker canvas</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        OffscreenCanvas rendering + tick updates happen in a worker; the main thread only sends controls.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        An XOR ring automaton rendered as accumulated rows on canvas. Each row is computed from
        the previous using XOR with neighbors, producing fractal-like patterns.
      </p>
      <WorkerCanvasDemo />
    </div>
  );
}
