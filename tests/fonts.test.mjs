/**
 * Inter is self-hosted as a variable font: one file and one @font-face per
 * unicode subset, answering every weight with `font-weight: 100 900`.
 *
 * It used to be listed once per weight, and because Google serves Inter as a
 * variable font those four files per subset were byte-identical — a page
 * using four weights downloaded the same bytes four times (268 KB on the home
 * page for ~67 KB of distinct font data). This pins the one-file-per-subset
 * shape and the byte budget of a first view.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../', import.meta.url).pathname;
const css = readFileSync(join(ROOT, 'src/styles/fonts.css'), 'utf8');

const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
const subsets = ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'];

test('exactly one @font-face per subset, each covering every weight', () => {
  assert.equal(faces.length, subsets.length, 'one @font-face per subset');
  for (const face of faces) {
    assert.match(face, /font-weight:\s*100 900;/, face);
    assert.match(face, /unicode-range:/, face);
  }
  const files = faces.map((f) => f.match(/url\(\/fonts\/([^)]+)\)/)[1]);
  assert.deepEqual(new Set(files).size, files.length, 'no file listed twice');
  assert.deepEqual(
    files.sort(),
    subsets.map((s) => `inter-${s}.woff2`).sort(),
  );
});

test('public/fonts holds those four files and nothing else', () => {
  const dir = join(ROOT, 'public/fonts');
  const present = readdirSync(dir).sort();
  assert.deepEqual(present, subsets.map((s) => `inter-${s}.woff2`).sort());
  for (const f of present) {
    assert.ok(statSync(join(dir, f)).size > 10_000, `${f} is a real font file`);
  }
});

test('a Cyrillic-script first view (latin + cyrillic) stays under 100 KB', () => {
  const dir = join(ROOT, 'public/fonts');
  const bytes = (s) => statSync(join(dir, `inter-${s}.woff2`)).size;
  assert.ok(bytes('latin') + bytes('cyrillic') < 100_000);
});

test('the layout preloads a file that exists', () => {
  const layout = readFileSync(join(ROOT, 'src/layouts/Layout.astro'), 'utf8');
  const href = layout.match(/href=\{`\$\{base\}(fonts\/[^`]+)`\}/)?.[1];
  assert.ok(href, 'a font preload is declared');
  assert.ok(existsSync(join(ROOT, 'public', href)), `${href} exists`);
  const dist = join(ROOT, 'dist', href);
  if (existsSync(join(ROOT, 'dist'))) assert.ok(existsSync(dist), `${href} built`);
});
