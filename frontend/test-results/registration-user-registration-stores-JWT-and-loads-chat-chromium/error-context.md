# Test info

- Name: user registration stores JWT and loads chat
- Location: C:\Users\Jenny\Documents\frontend-project-12\frontend\__tests__\registration.spec.jsx:3:1

# Error details

```
Error: expect(received).not.toBeNull()

Received: null
    at C:\Users\Jenny\Documents\frontend-project-12\frontend\__tests__\registration.spec.jsx:58:22
```

# Page snapshot

```yaml
- navigation:
  - link "Hexlet Chat":
    - /url: /
- img "Войти"
- heading "Войти" [level=1]
- textbox "Имя пользователя"
- textbox "Пароль"
- button "Войти"
- text: Нет аккаунта?
- link "Регистрация":
  - /url: /signup
- region "Notifications Alt+T"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test'
   2 |
   3 | test('user registration stores JWT and loads chat', async ({ page }) => {
   4 |   // go to signup page
   5 |   await page.goto('/signup')
   6 |   // wait for the form to render
   7 |   await page.waitForSelector('form', { timeout: 5000 })
   8 |
   9 |   // pipe page console to node console for debugging
  10 |   page.on('console', (m) => console.log('PAGE LOG:', m.text()))
  11 |   // listen for API requests to help debug missing network calls
  12 |   const apiRequests = []
  13 |   page.on('request', (req) => {
  14 |     const url = req.url()
  15 |     if (url.includes('/api/v1/')) {
  16 |       apiRequests.push({ url, method: req.method() })
  17 |     }
  18 |   })
  19 |
  20 |   // fill the signup form
  21 |   const username = `e2e_${Math.random().toString(36).slice(2, 8)}`
  22 |   await page.fill('input[name="username"]', username)
  23 |   await page.fill('input[name="password"]', 'Password123')
  24 |   await page.fill('input[name="confirmPassword"]', 'Password123')
  25 |
  26 |   // ensure submit button visible and enabled
  27 |   const submit = page.locator('button[type="submit"]')
  28 |   await expect(submit).toBeVisible()
  29 |   const isDisabled = await submit.getAttribute('disabled')
  30 |   if (isDisabled) {
  31 |     throw new Error('Submit button is disabled; form validation may be preventing submit')
  32 |   }
  33 |
  34 |   // debug: check that inputs exist
  35 |   const usernameCount = await page.locator('input[name="username"]').count()
  36 |   const passwordCount = await page.locator('input[name="password"]').count()
  37 |   console.log('Inputs found:', { usernameCount, passwordCount })
  38 |
  39 |   // debug: log form HTML to ensure correct form markup
  40 |   const formHTML = await page.locator('form').innerHTML()
  41 |   console.log('Form HTML snippet:', formHTML.slice(0, 1000))
  42 |
  43 |   // submit and wait a short while for the request to be emitted
  44 |   await submit.click()
  45 |   await page.waitForTimeout(3000)
  46 |
  47 |   // if no signup request observed, save page snapshot for debugging
  48 |   const signupSeen = apiRequests.some((r) => r.url.includes('/api/v1/signup'))
  49 |   if (!signupSeen) {
  50 |     const html = await page.content()
  51 |     // attach debug info to test output and fail with a helpful message
  52 |     console.error('No /api/v1/signup request observed. Page HTML snapshot:\n', html.slice(0, 10000))
  53 |     throw new Error('No /api/v1/signup request observed after form submit')
  54 |   }
  55 |
  56 |   // wait for response and validate localStorage
  57 |   const stored = await page.evaluate(() => localStorage.getItem('user'))
> 58 |   expect(stored).not.toBeNull()
     |                      ^ Error: expect(received).not.toBeNull()
  59 |
  60 |   const parsed = JSON.parse(stored)
  61 |   expect(parsed.token).toBeTruthy()
  62 |   expect(typeof parsed.token).toBe('string')
  63 |   expect(parsed.token.startsWith('<')).toBeFalsy()
  64 |
  65 |   // after login the app should navigate to chat: assert some chat element exists
  66 |   await expect(page.locator('text=Channels').first()).toBeVisible({ timeout: 5000 })
  67 | })
  68 |
```