import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { HomePage } from './pages/HomePage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { TutorialPage } from './pages/TutorialPage';
import { DefiningASimPage } from './pages/DefiningASimPage';
import { SimulationComponentPage } from './pages/SimulationComponentPage';
import { UsingTheHookPage } from './pages/UsingTheHookPage';
import { ControlsGuidePage } from './pages/ControlsGuidePage';
import { DefineSimApiPage } from './pages/api/DefineSimApiPage';
import { SimulationApiPage } from './pages/api/SimulationApiPage';
import { UseSimulationApiPage } from './pages/api/UseSimulationApiPage';
import { ControlsApiPage } from './pages/api/ControlsApiPage';
import { CreateEngineApiPage } from './pages/api/CreateEngineApiPage';
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
import { ActivatorsPage } from './pages/examples/ActivatorsPage';
import { PercolationPage } from './pages/examples/PercolationPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<HomePage />} />
          {/* Guide */}
          <Route path='guide/getting-started' element={<GettingStartedPage />} />
          <Route path='guide/tutorial' element={<TutorialPage />} />
          <Route path='guide/defining-a-sim' element={<DefiningASimPage />} />
          <Route path='guide/simulation-component' element={<SimulationComponentPage />} />
          <Route path='guide/using-the-hook' element={<UsingTheHookPage />} />
          <Route path='guide/controls' element={<ControlsGuidePage />} />
          {/* API Reference */}
          <Route path='api/define-sim' element={<DefineSimApiPage />} />
          <Route path='api/simulation' element={<SimulationApiPage />} />
          <Route path='api/use-simulation' element={<UseSimulationApiPage />} />
          <Route path='api/controls' element={<ControlsApiPage />} />
          <Route path='api/create-engine' element={<CreateEngineApiPage />} />
          {/* Examples */}
          <Route path='examples/counter' element={<CounterPage />} />
          <Route path='examples/fibonacci' element={<FibonacciPage />} />
          <Route path='examples/fibonacci-spiral' element={<FibonacciSpiralPage />} />
          <Route path='examples/dice' element={<DicePage />} />
          <Route path='examples/game-of-life' element={<GameOfLifePage />} />
          <Route path='examples/simple-model' element={<SimpleModelPage />} />
          <Route path='examples/automata-1d' element={<Automata1dPage />} />
          <Route path='examples/percolation' element={<PercolationPage />} />
          <Route path='examples/activators' element={<ActivatorsPage />} />
          <Route path='examples/worker-canvas' element={<WorkerCanvasPage />} />
          <Route path='examples/chaos-game' element={<ChaosGamePage />} />
          <Route path='examples/langton-ant' element={<LangtonAntPage />} />
          <Route path='examples/boids' element={<BoidsPage />} />
          <Route path='examples/snake' element={<SnakePage />} />
          <Route path='examples/mazes' element={<MazePage />} />
          <Route path='examples/epidemic' element={<EpidemicPage />} />
          <Route path='examples/segregation' element={<SegregationPage />} />
          <Route path='examples/segregation-local' element={<SegregationLocalPage />} />
          {/* Old routes redirect */}
          <Route path='guide/basic-blocks' element={<Navigate to='/guide/getting-started' replace />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
