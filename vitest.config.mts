import { defineConfig } from 'vitest/config';

/** Root `src/index.js` contains JSX; keep tests independent of that entry to avoid a JSX transform in Vitest. */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js']
  }
});
