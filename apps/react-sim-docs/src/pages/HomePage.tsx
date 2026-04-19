import React from 'react';
import { Link } from 'react-router-dom';
import { GameOfLifeDemo } from '../demos/GameOfLifeDemo';

const p: React.CSSProperties = {
  opacity: 0.85,
  lineHeight: 1.6,
  maxWidth: 720,
  fontSize: 15,
};

export function HomePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0, fontSize: 28 }}>react-sim</h1>
      <p style={{ ...p, fontSize: 17, opacity: 1 }}>
        Build tick-based simulations in React by writing only the business
        logic.
      </p>

      <p style={p}>
        Building a simulation from scratch means solving problems that have
        nothing to do with the simulation itself: managing animation loops,
        coordinating play/pause/reset state, wiring up timing controls,
        preventing unnecessary re-renders. These are all solved problems, but
        solving them correctly every time is tedious and error-prone.
      </p>
      <p style={p}>
        react-sim handles all of that. You provide four things:
      </p>
      <ol style={{ ...p, paddingLeft: 24 }}>
        <li>
          <strong>init</strong> &mdash; how to create the initial state
        </li>
        <li>
          <strong>step</strong> &mdash; how to advance the state by one tick
        </li>
        <li>
          <strong>render</strong> &mdash; how to display the current state
        </li>
        <li>
          <strong>params</strong> (optional) &mdash; what the user can
          configure
        </li>
      </ol>
      <p style={p}>
        Everything else &mdash; the animation loop, the state machine, the
        controls, the timing &mdash; is handled by the library.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Two execution modes</h2>
      <p style={p}>
        <strong>Main-thread</strong> (<code>sim</code> prop): the simulation
        runs in the browser on the main thread, driven by{' '}
        <code>requestAnimationFrame</code>. Good for lightweight simulations
        where computation is cheap.
      </p>
      <p style={p}>
        <strong>Worker</strong> (<code>worker</code> prop): data computation
        happens off the main thread, transparently. The same sim module works
        in both modes &mdash; switching is a one-prop change. Good for
        expensive simulations where you don{"'"}t want to block the UI.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12 }}>
        Two rendering patterns
      </h2>
      <p style={p}>
        <strong>React / DOM:</strong> the <code>&lt;Simulation&gt;</code>{' '}
        component exposes data via context. Children call{' '}
        <code>useSimulation()</code> and render normal JSX &mdash; divs, SVGs,
        whatever React can render. This is the standard React data flow.
      </p>
      <p style={p}>
        <strong>Canvas:</strong> children read data from the hook and
        imperatively draw to a <code>&lt;canvas&gt;</code> using refs and
        effects. The library doesn{"'"}t own the canvas &mdash; your render
        component does. This is the right pattern for high-performance
        visualizations.
      </p>

      <h2 style={{ marginTop: 32, marginBottom: 12 }}>See it in action</h2>
      <p style={p}>
        {"Conway's"} Game of Life, built with react-sim. The entire simulation
        logic is about 50 lines.
      </p>
      <div style={{ marginTop: 16, marginBottom: 32 }}>
        <GameOfLifeDemo />
      </div>

      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Start here</h2>
      <ul style={{ lineHeight: 2, fontSize: 15 }}>
        <li>
          <Link to="/guide/getting-started">Getting started</Link> &mdash;
          install and build your first simulation in 60 seconds
        </li>
        <li>
          <Link to="/guide/tutorial">Tutorial</Link> &mdash; build Game of
          Life step by step
        </li>
        <li>
          <Link to="/examples/counter">Examples</Link> &mdash; 18 interactive
          demos from counters to pathfinding snakes
        </li>
        <li>
          <Link to="/api/define-sim">API Reference</Link> &mdash; every
          function, component, and prop
        </li>
      </ul>
    </div>
  );
}
