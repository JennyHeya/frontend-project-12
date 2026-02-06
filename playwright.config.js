import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './__tests__',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices.chromiumDesktop },
    },
  ],

  webServer: {
    // Start the chat backend (API + socket) via node directly so tests
    // have both static files and API/socket endpoints available.
    // Use an explicit port so CI and local runs are deterministic.
    command: 'node ./node_modules/@hexlet/chat-server/bin/index.js -s ./frontend/dist -p 5001',
    url: 'http://localhost:5001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
