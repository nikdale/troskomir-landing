import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The analytics origin playwright.config.ts builds the dist with, so these
// tests see the CSP that ships rather than the narrower one a bare build emits.
const ANALYTICS_ORIGIN = 'https://analytics.troskomir.stryna.com';

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

// /open/ exists only at the root: it is the bridge from an e-mail button to a
// troskomir:// deep link and picks its copy from ?lang=. It hands the browser
// that scheme as soon as its script runs, and a navigation to an unknown
// scheme never reaches 'load' — hence 'commit'.
for (const width of [390, 768, 1440]) {
  test(`open/ at ${width}px is accessible`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://**/*', route => route.abort());
    await page.goto('/open/?to=budgets&lang=en', {waitUntil: 'commit'});
    await expect(page.locator('#open-button')).toHaveAttribute('href', 'troskomir://budgets');
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('open/ shows the default copy for a ?lang= it does not have', async ({page}) => {
  await page.route('https://**/*', route => route.abort());
  // `constructor` is a key every object has: looked up with `strings[lang] ||`,
  // it yielded a function instead of a translation and the page went blank.
  await page.goto('/open/?to=budgets&lang=constructor', {waitUntil: 'commit'});
  await expect(page.locator('#open-button')).toHaveAttribute('href', 'troskomir://budgets');
  await expect(page.locator('#open-title')).toHaveText('Отварање Трошкомира');
  await expect(page.locator('#open-body')).not.toBeEmpty();
  await expect(page.locator('#open-button')).not.toBeEmpty();
});

// One dist/404.html stands in for every unknown URL; an inline script picks
// the copy from the first path segment, so /en/… reads English with lang="en"
// rather than the Cyrillic Serbian the file is built in.
const NOT_FOUND = [
  {path: '/no-such-page/', lang: 'sr-Cyrl', h1: 'Страница није пронађена', home: '/'},
  {path: '/sr-Latn/no-such-page/', lang: 'sr-Latn', h1: 'Stranica nije pronađena', home: '/sr-Latn/'},
  {path: '/en/no-such-page/', lang: 'en', h1: 'Page not found', home: '/en/'},
  {path: '/ru/no-such-page/', lang: 'ru', h1: 'Страница не найдена', home: '/ru/'},
  {path: '/en/about/x.html', lang: 'en', h1: 'Page not found', home: '/en/'},
  // A segment that is a property of every object must not find one.
  {path: '/constructor/', lang: 'sr-Cyrl', h1: 'Страница није пронађена', home: '/'},
];
for (const {path, lang, h1, home} of NOT_FOUND) {
  test(`an unknown URL ${path} gets the 404 page in its own language`, async ({page}) => {
    const errors: string[] = [];
    const cspErrors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (/Content Security Policy|Refused to/.test(message.text())) cspErrors.push(message.text());
    });
    await page.route('https://**/*', route => route.abort());
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('h1')).toHaveText(h1);
    await expect(page.locator('main a').first()).toHaveAttribute('href', home);
    // The switch leads to the localized homes, not to the same missing path.
    for (const href of ['/', '/sr-Latn/', '/en/', '/ru/']) {
      await expect(page.locator(`header details a[href="${href}"]`)).toHaveCount(1);
    }
    const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(cspErrors).toEqual([]);
  });
}

// Inter is one variable file per subset. A first view downloads at most one
// file per script it renders — never the same bytes once per weight.
for (const path of ['/', '/sr-Latn/', '/en/', '/ru/', '/en/about/']) {
  test(`${path} downloads at most three font files, each once`, async ({page}) => {
    const fonts: {url: string; size: number}[] = [];
    page.on('response', async response => {
      if (!response.url().includes('/fonts/')) return;
      fonts.push({url: new URL(response.url()).pathname, size: (await response.body()).length});
    });
    await page.route('https://**/*', route => route.abort());
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const urls = fonts.map(f => f.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.length).toBeLessThanOrEqual(3);
    for (const url of urls) expect(url).toMatch(/\/fonts\/inter-(latin|latin-ext|cyrillic|cyrillic-ext)\.woff2$/);
    const total = fonts.reduce((sum, f) => sum + f.size, 0);
    // The Latin-script pages also need latin-ext for the Serbian diacritics
    // in the footer; that subset alone is 85 KB, so their budget is larger.
    expect(total).toBeLessThan(path === '/' || path === '/ru/' ? 100_000 : 160_000);
  });
}

test('the About portrait is served resized, well under the original 512 KB', async ({page}) => {
  const images: {url: string; size: number}[] = [];
  page.on('response', async response => {
    if (response.request().resourceType() !== 'image') return;
    images.push({url: new URL(response.url()).pathname, size: (await response.body()).length});
  });
  await page.route('https://**/*', route => route.abort());
  await page.goto('/en/about/');
  await page.waitForLoadState('networkidle');
  const portrait = page.locator('main img').first();
  await expect(portrait).toHaveAttribute('alt', 'Nikola Dašić');
  const currentSrc = await portrait.evaluate(img => new URL((img as HTMLImageElement).currentSrc).pathname);
  expect(currentSrc).toMatch(/^\/_astro\//);
  const fetched = images.find(i => i.url === currentSrc);
  expect(fetched, `portrait ${currentSrc} was fetched`).toBeTruthy();
  expect(fetched!.size).toBeLessThan(60_000);
  expect(images.some(i => i.url === '/nikola.jpg')).toBe(false);
});

test('mobile menus work with the keyboard and have accessible names', async ({page}) => {
  await page.setViewportSize({width: 390, height: 900});
  await page.route('https://**/*', route => route.abort());
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
  await expect(page.getByRole('alert')).toHaveText(/Incorrect or expired code/);
  await expect(page.locator('#da-confirm-btn')).toBeEnabled();
  await page.locator('#da-confirm-btn').click();
  await expect(page.getByRole('status')).toBeVisible();
  expect(requests).toBe(4);
});

test('deletion tells a server error or no response apart from a wrong code', async ({page}) => {
  let requests = 0;
  await page.route('https://**/*', async route => {
    if (!route.request().url().includes('/account-deletion/')) return route.abort();
    requests++;
    if (requests === 1) return route.fulfill({status: 200, contentType: 'application/json', body: '{}'});
    if (requests === 2) return route.fulfill({status: 503, contentType: 'application/json', body: JSON.stringify({message: 'Synthetic test response'})});
    await route.abort('failed');
  });
  await page.goto('/en/delete-account/');
  await page.locator('#da-email').fill('synthetic@example.invalid');
  await page.locator('#da-send-btn').click();
  await expect(page.locator('#da-code-form')).toBeVisible();
  await page.locator('#da-code').fill('123456');
  page.on('dialog', dialog => dialog.accept());
  // 5xx: the code was never checked, so "incorrect or expired code" is wrong.
  await page.locator('#da-confirm-btn').click();
  await expect(page.getByRole('alert')).toHaveText('Something went wrong. Please try again in a moment.');
  await expect(page.locator('#da-confirm-btn')).toBeEnabled();
  // Network failure (status 0): same.
  await page.locator('#da-confirm-btn').click();
  await expect(page.getByRole('alert')).toHaveText('Something went wrong. Please try again in a moment.');
  await expect(page.locator('#da-confirm-btn')).toBeEnabled();
  expect(requests).toBe(3);
});

test('the shipped CSP admits the analytics origin without reopening inline script', async ({page}) => {
  const cspErrors: string[] = [];
  page.on('console', message => {
    if (/Content Security Policy/.test(message.text())) cspErrors.push(message.text());
  });
  await page.route('https://**/*', route => route.abort());
  await page.goto('/en/delete-account/');
  // The build really was configured with the analytics origin...
  await expect(page.locator(`script[src="${ANALYTICS_ORIGIN}/script.js"]`)).toHaveCount(1);
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
  const directive = (name: string) =>
    csp?.split(';').map(part => part.trim()).find(part => part.startsWith(name)) ?? '';
  // ...and the policy admits it where it needs to, and nowhere else.
  expect(directive('script-src')).toContain(ANALYTICS_ORIGIN);
  expect(directive('connect-src')).toContain(ANALYTICS_ORIGIN);
  expect(directive('script-src')).not.toContain("'unsafe-inline'");
  expect(directive('script-src')).toMatch(/'sha256-/);
  expect(directive('default-src')).toBe("default-src 'self'");
  // The page's own inline script still runs under that policy.
  await page.locator('#da-email').fill('synthetic@example.invalid');
  await page.locator('#da-send-btn').click();
  await expect(page.getByRole('alert')).toBeVisible();
  expect(cspErrors).toEqual([]);
});
