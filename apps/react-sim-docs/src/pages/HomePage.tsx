import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>react-sim</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Modernized simulation building blocks: a pure TypeScript engine, a thin React adapter, and worker-friendly
        patterns.
      </p>

      <h2 style={{ marginTop: 24, marginBottom: 8 }}>Get started</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <Link to="/guide/basic-blocks">Basic blocks</Link>
        </li>
      </ul>

      <h2 style={{ marginTop: 24, marginBottom: 8 }}>Examples</h2>
      <ul style={{ lineHeight: 1.7 }}>
        <li>
          <Link to="/examples/counter">Counter</Link> — in-thread simulation + controls
        </li>
        <li>
          <Link to="/examples/fibonacci">Fibonacci numbers</Link> — DOM list, <code>Simulation</code>
        </li>
        <li>
          <Link to="/examples/dice">Dice</Link> — DOM dice + histogram, <code>Simulation</code>
        </li>
        <li>
          <Link to="/examples/simple-model">Simple model</Link> — filling grid (tutorial-style)
        </li>
        <li>
          <Link to="/examples/automata-1d">1D cellular automata</Link> — rule 0–255 + history
        </li>
        <li>
          <Link to="/examples/game-of-life">Game of Life</Link> — DOM grid, main-thread <code>Simulation</code>
        </li>
        <li>
          <Link to="/examples/fibonacci-spiral">Fibonacci spiral</Link> — worker ticks, main-thread canvas
        </li>
        <li>
          <Link to="/examples/worker-canvas">Worker canvas</Link> — worker ticks, main-thread canvas (XOR ring)
        </li>
        <li>
          <Link to="/examples/chaos-game">Chaos game</Link> — worker ticks, main-thread canvas (chaos / IFS)
        </li>
        <li>
          <Link to="/examples/langton-ant">Langton's ant</Link> — worker ticks, toroidal grid automaton
        </li>
        <li>
          <Link to="/examples/boids">Boids</Link> — worker ticks, flocking (original demo port)
        </li>
        <li>
          <Link to="/examples/snake">Snake</Link> — worker ticks, AI pathfinding snake (original demo port)
        </li>
        <li>
          <Link to="/examples/mazes">Mazes</Link> — worker ticks, maze generation on multiple tilings
        </li>
        <li>
          <Link to="/examples/epidemic">Epidemic</Link> — worker + main-thread canvas
        </li>
        <li>
          <Link to="/examples/segregation">Segregation</Link> — worker + canvas + time series
        </li>
        <li>
          <Link to="/examples/segregation-local">Segregation (local)</Link> — same business logic, no worker
        </li>
      </ul>
    </div>
  );
}
