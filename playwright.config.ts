import { defineConfig, devices } from '@playwright/test'

/**
 * E2E do caminho de conversão. Os navegadores não vêm com o pacote: rode
 * `npx playwright install chromium` antes do primeiro `npm run test:e2e`.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3010',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 3010',
    url: 'http://localhost:3010',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
