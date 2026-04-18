import React from 'react';
import { PercolationDemo } from '../../demos/PercolationDemo';

export function PercolationPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Percolation</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A 2D lattice is made of cells which either let liquid go through (porous) or not.
        If we pour liquid on the top of the lattice, will any of it go through?
        This depends on the porosity of the lattice &mdash; the percentage of cells which are porous.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        Interestingly, the chances of liquid getting through don&apos;t vary linearly with the porosity.
        Below a certain{' '}
        <a href="https://en.wikipedia.org/wiki/Percolation_threshold">threshold</a> (around <em>0.59</em> for
        a 2D lattice), percolation is very unlikely; above it, it becomes very likely.
      </p>
      <p style={{ opacity: 0.85, lineHeight: 1.55, maxWidth: 720 }}>
        A 2D lattice is made of cells which either let liquid through (porous) or not. Liquid
        is poured from the top — will it reach the bottom? This depends on the porosity. The
        chances don&apos;t vary linearly: below a threshold (~0.59 for a 2D lattice), liquid rarely
        gets through; above it, percolation becomes very likely.
      </p>
      <PercolationDemo />
    </div>
  );
}
