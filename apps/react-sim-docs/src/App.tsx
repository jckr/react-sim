import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DocsLayout } from './layout/DocsLayout';
import { HomePage } from './pages/HomePage';
import { BasicBlocksPage } from './pages/BasicBlocksPage';
import { CounterPage } from './pages/examples/CounterPage';
import { WorkerCanvasPage } from './pages/examples/WorkerCanvasPage';
import { SegregationPage } from './pages/examples/SegregationPage';
import { SegregationLocalPage } from './pages/examples/SegregationLocalPage';

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

