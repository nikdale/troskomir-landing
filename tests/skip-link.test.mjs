/**
 * Every page is wrapped in Layout.astro. The skip link has to be the first
 * focusable control and the thing it points at has to exist, in source —
 * the built pages are produced by `npm run build`, which this test does not
 * require.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../src/', import.meta.url).pathname;

function astroFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...astroFiles(path));
    else if (entry.name.endsWith('.astro')) out.push(path);
  }
  return out;
}

test('the layout leads with a skip link to #main', () => {
  const layout = readFileSync(join(SRC, 'layouts/Layout.astro'), 'utf8');
  const bodyAt = layout.indexOf('<body');
  const slotAt = layout.indexOf('<slot />');
  const skipAt = layout.indexOf('class="skip-link" href="#main"');
  assert.ok(bodyAt !== -1 && skipAt !== -1 && slotAt !== -1);
  assert.ok(bodyAt < skipAt && skipAt < slotAt, 'skip link must be the first thing in body');
  assert.match(layout, /t\('a11y\.skipToContent'\)/);
});

test('the skip link is hidden until focused', () => {
  const css = readFileSync(join(SRC, 'styles/global.css'), 'utf8');
  assert.match(css, /\.skip-link\s*\{[^}]*transform:\s*translateY\(-150%\)/s);
  assert.match(css, /\.skip-link:focus\s*\{[^}]*transform:\s*translateY\(0\.75rem\)/s);
});

test('every page main is the skip target', () => {
  const pages = astroFiles(join(SRC, 'pages'));
  assert.ok(pages.length > 0);
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    assert.match(html, /<main\b[^>]*\bid="main"/, `${page} has no id="main"`);
  }
});
