import React from 'react';
import { SegregationLocalDemo } from '../../demos/SegregationLocalDemo';

export function SegregationLocalPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Segregation (local, no worker)</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Same business logic module as the worker version, but rendered and stepped on the main thread.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A local variant of Schelling&apos;s segregation model, running on the main thread.
      </p>
      <SegregationLocalDemo />
    </div>
  );
}

