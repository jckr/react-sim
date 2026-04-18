import React from 'react';
import { SimpleModelDemo } from '../../demos/SimpleModelDemo';

export function SimpleModelPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Simple model</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A 10×10 grid that fills in tick order — minimal main-thread <code>Simulation</code> (from the old tutorial).
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        This model shows how the parts of react-sim work together. 100 cells are arranged on a
        grid. A cell is filled if its number is less than the current tick. No initData or
        updateData needed — it works directly with the tick value.
      </p>
      <SimpleModelDemo />
    </div>
  );
}
