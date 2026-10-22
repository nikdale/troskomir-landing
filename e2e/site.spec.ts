import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const locale of ['', 'sr-Latn/', 'en/', 'ru/']) {
  for (const width of [390, 768, 1440]) {
    for (const route of ['', 'about/', 'privacy/', 'terms/', 'delete-account/']) {
      test(`${locale || 'sr/'}${route || 'home'} at ${width}px is accessible`, async ({page}) => {
        await page.setViewportSize({width, height: 900});
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        // Every browser test is local. No analytics or real API requests.
        await page.route('https://**/*', route => route.abort());
        await page.goto(`/${locale}${route}`);
        await expect(page.locator('h1')).toHaveCount(1);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(results.violations).toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  }
}

test('mobile menus work with the keyboard and have accessible names', async ({page}) => {
  await page.setViewportSize({width: 390, height: 900});
  await page.goto('/en/');
  const menu = page.locator('header summary').first();
  await expect(menu).toHaveAccessibleName(/menu/i);
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('header details').first()).toHaveAttribute('open', '');
  await expect(page.locator('header details').first().getByRole('link', {name: /about/i})).toBeVisible();
});

test('deletion handles rate limit, invalid code and success without a real account', async ({page}) => {
  let requests = 0;
  await page.route('https://**/*', async route => {
    if (!route.request().url().includes('/account-deletion/')) return route.abort();
    requests++;
    const status = requests === 1 ? 429 : requests === 3 ? 400 : 200;
    await route.fulfill({status, contentType: 'application/json', body: JSON.stringify({message: 'Synthetic test response'})});
  });
  await page.goto('/en/delete-account/');
  await page.locator('#da-email').fill('synthetic@example.invalid');
  await page.locator('#da-send-btn').click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('#da-send-btn')).toBeEnabled();
  await page.locator('#da-send-btn').click();
  await expect(page.locator('#da-code-form')).toBeVisible();
  await page.locator('#da-code').fill('123456');
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#da-confirm-btn').click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('#da-confirm-btn')).toBeEnabled();
  await page.locator('#da-confirm-btn').click();
  await expect(page.getByRole('status')).toBeVisible();
  expect(requests).toBe(4);
});
