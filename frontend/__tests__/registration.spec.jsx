import { test, expect } from '@playwright/test'

test('user registration stores JWT and loads chat', async ({ page }) => {
  // go to signup page
  await page.goto('/signup')
  // wait for the form to render
  await page.waitForSelector('form', { timeout: 5000 })

  // pipe page console to node console for debugging
  page.on('console', (m) => console.log('PAGE LOG:', m.text()))
  // listen for API requests to help debug missing network calls
  const apiRequests = []
  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('/api/v1/')) {
      apiRequests.push({ url, method: req.method() })
    }
  })

  // fill the signup form
  const username = `e2e_${Math.random().toString(36).slice(2, 8)}`
  await page.fill('input[name="username"]', username)
  await page.fill('input[name="password"]', 'Password123')
  await page.fill('input[name="confirmPassword"]', 'Password123')

  // ensure submit button visible and enabled
  const submit = page.locator('button[type="submit"]')
  await expect(submit).toBeVisible()
  const isDisabled = await submit.getAttribute('disabled')
  if (isDisabled) {
    throw new Error('Submit button is disabled; form validation may be preventing submit')
  }

  // debug: check that inputs exist
  const usernameCount = await page.locator('input[name="username"]').count()
  const passwordCount = await page.locator('input[name="password"]').count()
  console.log('Inputs found:', { usernameCount, passwordCount })

  // debug: log form HTML to ensure correct form markup
  const formHTML = await page.locator('form').innerHTML()
  console.log('Form HTML snippet:', formHTML.slice(0, 1000))

  // submit and wait a short while for the request to be emitted
  await submit.click()
  await page.waitForTimeout(3000)

  // if no signup request observed, save page snapshot for debugging
  const signupSeen = apiRequests.some((r) => r.url.includes('/api/v1/signup'))
  if (!signupSeen) {
    const html = await page.content()
    // attach debug info to test output and fail with a helpful message
    console.error('No /api/v1/signup request observed. Page HTML snapshot:\n', html.slice(0, 10000))
    throw new Error('No /api/v1/signup request observed after form submit')
  }

  // wait for response and validate localStorage
  const stored = await page.evaluate(() => localStorage.getItem('user'))
  expect(stored).not.toBeNull()

  const parsed = JSON.parse(stored)
  expect(parsed.token).toBeTruthy()
  expect(typeof parsed.token).toBe('string')
  expect(parsed.token.startsWith('<')).toBeFalsy()

  // after login the app should navigate to chat: assert some chat element exists
  await expect(page.locator('text=Channels').first()).toBeVisible({ timeout: 5000 })
})
