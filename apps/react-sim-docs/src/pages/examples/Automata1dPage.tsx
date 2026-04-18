import React from 'react';
import { Automata1dDemo } from '../../demos/Automata1dDemo';

export function Automata1dPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>1D cellular automata</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        1D cellular automata are among the simplest of automata. Each line consists of cells
        which are either set or not. At each tick, a rule determines whether cells on the next
        line will be set based on the three cells above. There are 8 possible combinations
        (2&times;2&times;2), and for each, the rule determines the output &mdash; giving us 256
        possible rules. You can select a rule by adjusting the slider or by clicking on each of
        the bits.
      </p>
      <Automata1dDemo />
    </div>
  );
}
