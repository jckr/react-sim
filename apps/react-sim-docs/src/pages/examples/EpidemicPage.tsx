import React from 'react';
import { EpidemicDemo } from '../../demos/EpidemicDemo';

export function EpidemicPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Epidemic</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Agents bounce in a box with infection dynamics — ticks in a worker, canvas and counts on the main thread.
      </p>
      <EpidemicDemo />
    </div>
  );
}
