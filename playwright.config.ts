import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure'},
  workers: 2,
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock',
    // Production-like values, so the dist under test carries the CSP that
    // actually ships — the analytics origin in script-src and connect-src —
    // and the analytics <script>. A build without them emits a narrower
    // policy that the browser tests then never exercised. Nothing is fetched
    // from this origin: every test aborts https:// requests.
    env: {
      PUBLIC_ANALYTICS_URL: 'https://analytics.troskomir.stryna.com',
      PUBLIC_UMAMI_WEBSITE_ID: '00000000-0000-4000-8000-000000000000',
    },
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
