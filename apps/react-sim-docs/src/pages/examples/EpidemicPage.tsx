import React from 'react';
import { EpidemicDemo } from '../../demos/EpidemicDemo';

export function EpidemicPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Epidemic</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        <strong>Caveat:</strong> this model is just to show how simulations work. It has no
        scientific value.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Inspired by Harry Stevens{"'"} work at the Washington Post, this epidemic simulator shows
        agents moving in a small space. When they collide, sick agents may contaminate healthy
        agents, and sick agents may die or recover.
      </p>
      <EpidemicDemo />
    </div>
  );
}
