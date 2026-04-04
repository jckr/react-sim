import React from 'react';
import { Automata1dDemo } from '../../demos/Automata1dDemo';

export function Automata1dPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>1D cellular automata</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Elementary CA (rule 0–255) with history from the engine cache — main-thread <code>Simulation</code>.
      </p>
      <Automata1dDemo />
    </div>
  );
}
