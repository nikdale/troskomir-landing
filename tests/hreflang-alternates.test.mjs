/**
 * Walks the built site and asserts that no URL it advertises about itself is a
 * 404: every hreflang alternate, every canonical, and every URL in the sitemap
 * has to resolve to a file that exists in dist/.
 *
 * The layout used to emit alternates for all four locales unconditionally. That
 * is right for the five localized routes and wrong for /open/, which exists
 * only at the root — it is the bridge an e-mail button goes through and it
 * picks its copy from `?lang=`, so /sr-Latn/open/, /en/open/ and /ru/open/ were
 * never built. Search Console reported three invalid alternates on the one site
 * whose job is to stay crawlable for the Play re-check of the developer
 * website. A hand-kept "which pages are localized" list would have gone stale
 * again, so src/i18n/utils.ts derives it from src/pages/ and this test checks
 * the result against what actually landed on disk.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://troskomir.stryna.com';

function htmlFiles(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(path));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out.sort();
}

const PAGES = htmlFiles().map((file) => ({
  name: '/' + relative(DIST, file).replace(/index\.html$/, ''),
  html: readFileSync(file, 'utf8'),
}));

/** dist/ is served as-is, so /about/ is dist/about/index.html and nothing else. */
function builtFileFor(url, context) {
  assert.ok(url.startsWith(`${SITE}/`), `${context}: ${url} is not on ${SITE}`);
  const path = url.slice(SITE.length);
  return path.endsWith('/') ? join(DIST, path, 'index.html') : join(DIST, path);
}

function assertResolves(url, context) {
  const file = builtFileFor(url, context);
  assert.ok(
    existsSync(file),
    `${context} advertises ${url}, which is not built (no ${relative(DIST, file)})`,
  );
}

function alternatesOf(html) {
  return [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(
    ([, hreflang, href]) => ({ hreflang, href }),
  );
}

test('every hreflang alternate on every built page resolves to a built page', () => {
  let checked = 0;
  for (const { name, html } of PAGES) {
    for (const { hreflang, href } of alternatesOf(html)) {
      assertResolves(href, `${name} (hreflang="${hreflang}")`);
      checked += 1;
    }
  }
  // 5 routes × 4 locales × (4 alternates + x-default) + /open/ × 2.
  assert.equal(checked, 102, `expected 102 alternate links, found ${checked}`);
});

test('every canonical resolves to a built page', () => {
  for (const { name, html } of PAGES) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${name} has no canonical`);
    assertResolves(canonical, `${name} (canonical)`);
  }
});

test('a page is its own canonical', () => {
  // The canonical is taken from the same helper as the alternates so the two
  // cannot disagree about a trailing slash; this is the check that it points at
  // this page rather than at a sibling locale.
  for (const { name, html } of PAGES) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
    assert.equal(
      canonical,
      `${SITE}${name}`,
      `${name} declares a different page as its canonical`,
    );
  }
});

test('/open/ advertises only the locale it is built in', () => {
  const open = PAGES.find(({ name }) => name === '/open/');
  assert.ok(open, '/open/ was not built');

  const alternates = alternatesOf(open.html);
  assert.deepEqual(
    alternates.map(({ hreflang }) => hreflang).sort(),
    ['sr-Cyrl', 'x-default'],
    'the /open/ bridge exists only at the root — any other hreflang is a 404',
  );
  for (const { href } of alternates) {
    assert.equal(href, `${SITE}/open/`);
  }
});

test('the localized routes still advertise all four locales', () => {
  // The fix for /open/ must not have narrowed the pages that genuinely do exist
  // four times over: dropping an alternate there makes the locales compete
  // instead of consolidating.
  const localized = ['/', '/about/', '/delete-account/', '/privacy/', '/terms/'];
  for (const route of localized) {
    for (const prefix of ['', 'en/', 'ru/', 'sr-Latn/']) {
      const name = `/${prefix}${route.slice(1)}`;
      const page = PAGES.find((p) => p.name === name);
      assert.ok(page, `${name} was not built`);
      assert.deepEqual(
        alternatesOf(page.html)
          .map(({ hreflang }) => hreflang)
          .sort(),
        ['en', 'ru', 'sr-Cyrl', 'sr-Latn', 'x-default'],
        `${name} does not advertise all four locales`,
      );
    }
  }
});

test('x-default points at the default locale, which is Cyrillic Serbian', () => {
  for (const { name, html } of PAGES) {
    const alternates = alternatesOf(html);
    const xDefault = alternates.find(({ hreflang }) => hreflang === 'x-default');
    const cyrillic = alternates.find(({ hreflang }) => hreflang === 'sr-Cyrl');
    assert.ok(xDefault, `${name} has no x-default`);
    assert.ok(cyrillic, `${name} has no sr-Cyrl alternate`);
    assert.equal(xDefault.href, cyrillic.href, `${name}: x-default is not the sr-Cyrl URL`);
  }
});

test('the sitemap lists nothing that was not built', () => {
  const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  const urls = [
    ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url),
    ...[...sitemap.matchAll(/xhtml:link[^>]*href="([^"]+)"/g)].map(([, url]) => url),
  ];
  assert.ok(urls.length >= PAGES.length, 'the sitemap is suspiciously short');
  for (const url of urls) assertResolves(url, 'sitemap-0.xml');
});
