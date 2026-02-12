/* eslint-disable no-undef */
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './__tests__',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
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
    // Avoid executing the package's `start-server` bin directly.
    command: 'node ./node_modules/@hexlet/chat-server/bin/index.js -s ./frontend/dist',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
