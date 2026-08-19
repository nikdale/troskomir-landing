/**
 * Google Play is live; App Store is not. The marketing site has to say
 * that in every locale, and a future "coming soon" regression would send
 * people to a 404.
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
const HOMEPAGES = ['', 'en/', 'ru/', 'sr-Latn/'];

function page(rel) {
  const file = join(DIST, rel, 'index.html');
  assert.ok(existsSync(file), `${rel || '/'} was not built — run \`npm run build\` first`);
  return readFileSync(file, 'utf8');
}

test('every homepage links to the live Play listing', () => {
  for (const prefix of HOMEPAGES) {
    const html = page(prefix);
    assert.match(
      html,
      new RegExp(`href="${PLAY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`),
      `${prefix || '/'} is missing the Play Store href`,
    );
  }
});

test('no homepage pretends the App Store listing is live', () => {
  for (const prefix of HOMEPAGES) {
    assert.doesNotMatch(
      page(prefix),
      /href="https:\/\/apps\.apple\.com/,
      `${prefix || '/'} links at the App Store before Apple has approved`,
    );
  }
});

test('the /open bridge offers Google Play when the app is not installed', () => {
  const html = page('open/');
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.troskomir\.troskomir_mobile/);
  assert.match(html, />Google Play</);
});
