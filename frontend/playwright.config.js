import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './__tests__',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
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
    // Start the chat backend (API + socket) using the project-installed
    // chat-server node script. When Playwright runs from `frontend/`,
    // the chat-server package is available in the parent `node_modules`.
    // Specify port to ensure tests and server agree.
    command: 'node ../node_modules/@hexlet/chat-server/bin/index.js -s ./dist -p 5001',
    url: 'http://localhost:5001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
