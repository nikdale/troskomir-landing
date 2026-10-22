/**
 * dist/404.html is one file for every unknown URL in every locale (GitHub
 * Pages serves it as-is), so the copy a visitor sees for /en/… or /ru/… is
 * chosen in the browser from the first path segment. This checks the built
 * page carries every locale's copy, the hooks the script needs, and the
 * prototype-safe lookup; tests/head-metadata.test.mjs verifies the script's
 * CSP hash like any other inline script.
 *
 * Run after `npm run build`: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync(join(new URL('../dist/', import.meta.url).pathname, '404.html'), 'utf8');

test('renders the default language and the hooks the localiser needs', () => {
  assert.match(html, /<html lang="sr-Cyrl"/);
  assert.match(html, /<h1 id="nf-heading"[^>]*>Страница није пронађена<\/h1>/);
  assert.match(html, /<p id="nf-body"/);
  assert.match(html, /<a id="nf-home" href="\/"/);
});

test('carries every locale\'s copy and home link for the inline script', () => {
  const script = html.match(/<script>([\s\S]*?)<\/script>/g)?.find((s) => s.includes('nf-heading'));
  assert.ok(script, 'inline localiser present');
  assert.match(script, /Object\.hasOwn\(copy, seg\)/);
  for (const [code, heading, href] of [
    ['en', 'Page not found', '/en/'],
    ['ru', 'Страница не найдена', '/ru/'],
    ['sr-Latn', 'Stranica nije pronađena', '/sr-Latn/'],
    ['sr', 'Страница није пронађена', '/'],
  ]) {
    assert.ok(script.includes(`"${code}":`), `${code} copy present`);
    assert.ok(script.includes(JSON.stringify(heading)), `${code} heading present`);
    assert.ok(script.includes(JSON.stringify(href)), `${code} home href present`);
  }
  assert.ok(script.includes('"htmlLang":"sr-Cyrl"'));
});

test('still a noindex page without canonical or alternates', () => {
  assert.match(html, /<meta name="robots" content="noindex"/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /rel="alternate"/);
});
