import React from 'react';
import BasicBlocks from './pages/basic-blocks.mdx';

export function App() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ marginTop: 0 }}>react-sim modernized: basic blocks</h1>
      <BasicBlocks />
    </div>
  );
}

