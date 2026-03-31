import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'apps/react-sim-docs/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'npm run dev -w react-sim-docs -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 120_000
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
