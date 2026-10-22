import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure'},
  workers: 2,
  webServer: {command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock', url: 'http://127.0.0.1:4321', reuseExistingServer: false, timeout: 120000},
});
