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
    // Use the frontend start script to serve the built `dist` directory.
    // This avoids running the `@hexlet/chat-server` wrapper which can
    // cause permission issues inside some CI containers.
    command: 'npm run start --prefix frontend',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
