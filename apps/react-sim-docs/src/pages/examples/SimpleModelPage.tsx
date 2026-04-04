import React from 'react';
import { SimpleModelDemo } from '../../demos/SimpleModelDemo';

export function SimpleModelPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Simple model</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A 10×10 grid that fills in tick order — minimal main-thread <code>Simulation</code> (from the old tutorial).
      </p>
      <SimpleModelDemo />
    </div>
  );
}
