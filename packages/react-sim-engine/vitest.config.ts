import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['packages/react-sim-engine/src/**/*.test.ts']
  }
});

