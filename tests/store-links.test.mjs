/**
 * Both stores are live. The marketing site has to link to both in every
 * locale, and a regression that drops either link would send people to a
 * dead end (or worse, silently omit a platform's users).
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PLAY =
  'https://play.google.com/store/apps/details?id=com.troskomir.troskomir_mobile';
const APP_STORE = 'https://apps.apple.com/rs/app/troskomir/id6790151828';
const HOMEPAGES = ['', 'en/', 'ru/', 'sr-Latn/'];

function page(rel) {
  const file = join(DIST, rel, 'index.html');
  assert.ok(existsSync(file), `${rel || '/'} was not built — run \`npm run build\` first`);
  return readFileSync(file, 'utf8');
}

function hrefPattern(url) {
  return new RegExp(`href="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
}

test('every homepage links to the live Play listing', () => {
  for (const prefix of HOMEPAGES) {
    const html = page(prefix);
    assert.match(html, hrefPattern(PLAY), `${prefix || '/'} is missing the Play Store href`);
  }
});

test('every homepage links to the live App Store listing', () => {
  for (const prefix of HOMEPAGES) {
    const html = page(prefix);
    assert.match(
      html,
      hrefPattern(APP_STORE),
      `${prefix || '/'} is missing the App Store href`,
    );
  }
});

test('the /open bridge offers both stores when the app is not installed', () => {
  const html = page('open/');
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.troskomir\.troskomir_mobile/);
  assert.match(html, />Google Play</);
  assert.match(html, /apps\.apple\.com\/rs\/app\/troskomir\/id6790151828/);
  assert.match(html, />App Store</);
});
