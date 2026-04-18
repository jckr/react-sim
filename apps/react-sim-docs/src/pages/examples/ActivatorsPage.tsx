import React from 'react';
import { ActivatorsDemo } from '../../demos/ActivatorsDemo';

export function ActivatorsPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Activators / Inhibitors</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        The activator-inhibitor model is a simulation of pattern formation such as the fur
        patterns of animals like the zebra or the giraffe. Cells are arranged in a 2D grid
        and can either be activated (colored) or not. Each activated cell activates cells in
        its inner radius, and inhibits cells in its outer radius. Each turn, we count
        activations and inhibitions for every cell. The weight coefficient determines the
        relative power of inhibitors. If a cell is activated more than it{"'"}s inhibited, it
        becomes activated; otherwise it{"'"}s deactivated.
      </p>
      <ActivatorsDemo />
    </div>
  );
}
