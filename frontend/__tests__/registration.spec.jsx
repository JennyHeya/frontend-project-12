import { test, expect } from '@playwright/test'

test('user registration stores JWT and loads chat (mocked API)', async ({ page }) => {
  // mock the signup endpoint to return a valid JWT token
  await page.route('**/api/v1/signup', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'mock_jwt_token_12345', username: 'e2e_user' }),
    })
  })

  // mock the data endpoint to return chat data
  await page.route('**/api/v1/data', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        channels: [
          { id: 1, name: 'general' },
          { id: 2, name: 'random' },
        ],
        currentChannelId: 1,
        messages: [],
      }),
    })
  })

  // mock socket.io connection by preventing real connection attempt
  await page.addInitScript(() => {
    // stub socket.io globally so it doesn't try to connect
    window.io = () => {
      return {
        on: () => {},
        off: () => {},
        emit: () => {},
        connect: () => {},
        disconnect: () => {},
      }
    }
  })

  // go to signup page
  await page.goto('/signup')
  
  // wait for body to be visible first
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 })
  
  // add some debugging
  const pageTitle = await page.title()
  const bodyText = await page.locator('body').textContent()
  // eslint-disable-next-line no-console
  console.log('[test] Page title:', pageTitle)
  // eslint-disable-next-line no-console
  console.log('[test] Body text length:', bodyText?.length)
  
  // wait for the form to render
  await page.waitForSelector('form', { timeout: 10000 })

  // fill the signup form
  const username = `e2e_${Math.random().toString(36).slice(2, 8)}`
  await page.fill('input[name="username"]', username)
  await page.fill('input[name="password"]', 'Password123')
  await page.fill('input[name="confirmPassword"]', 'Password123')

  // ensure submit button visible and enabled
  const submit = page.locator('button[type="submit"]')
  await expect(submit).toBeVisible()

  // submit and wait for navigation to chat
  await submit.click()

  // wait for the app to redirect to chat (look for "Channels" text or "general" channel)
  await expect(page.locator('text=general').first()).toBeVisible({ timeout: 10000 })

  // verify localStorage has the token
  const stored = await page.evaluate(() => localStorage.getItem('user'))
  expect(stored).not.toBeNull()

  const parsed = JSON.parse(stored)
  expect(parsed.token).toBeTruthy()
  expect(typeof parsed.token).toBe('string')
  expect(parsed.token).not.toMatch(/^</)
})
