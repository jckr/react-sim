import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { HomePage } from './pages/HomePage';
import { BasicBlocksPage } from './pages/BasicBlocksPage';
import { CounterPage } from './pages/examples/CounterPage';
import { WorkerCanvasPage } from './pages/examples/WorkerCanvasPage';
import { SegregationPage } from './pages/examples/SegregationPage';
import { SegregationLocalPage } from './pages/examples/SegregationLocalPage';
import { GameOfLifePage } from './pages/examples/GameOfLifePage';
import { ChaosGamePage } from './pages/examples/ChaosGamePage';
import { FibonacciPage } from './pages/examples/FibonacciPage';
import { FibonacciSpiralPage } from './pages/examples/FibonacciSpiralPage';
import { DicePage } from './pages/examples/DicePage';
import { SimpleModelPage } from './pages/examples/SimpleModelPage';
import { Automata1dPage } from './pages/examples/Automata1dPage';
import { EpidemicPage } from './pages/examples/EpidemicPage';
import { LangtonAntPage } from './pages/examples/LangtonAntPage';
import { BoidsPage } from './pages/examples/BoidsPage';
import { SnakePage } from './pages/examples/SnakePage';
import { MazePage } from './pages/examples/MazePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<HomePage />} />
          <Route path="guide/basic-blocks" element={<BasicBlocksPage />} />
          <Route path="examples/counter" element={<CounterPage />} />
          <Route path="examples/worker-canvas" element={<WorkerCanvasPage />} />
          <Route path="examples/segregation" element={<SegregationPage />} />
          <Route path="examples/segregation-local" element={<SegregationLocalPage />} />
          <Route path="examples/game-of-life" element={<GameOfLifePage />} />
          <Route path="examples/chaos-game" element={<ChaosGamePage />} />
          <Route path="examples/langton-ant" element={<LangtonAntPage />} />
          <Route path="examples/boids" element={<BoidsPage />} />
          <Route path="examples/snake" element={<SnakePage />} />
          <Route path="examples/mazes" element={<MazePage />} />
          <Route path="examples/fibonacci" element={<FibonacciPage />} />
          <Route path="examples/fibonacci-spiral" element={<FibonacciSpiralPage />} />
          <Route path="examples/dice" element={<DicePage />} />
          <Route path="examples/simple-model" element={<SimpleModelPage />} />
          <Route path="examples/automata-1d" element={<Automata1dPage />} />
          <Route path="examples/epidemic" element={<EpidemicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

