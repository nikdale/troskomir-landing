/**
 * The About page's portrait goes through Astro's image pipeline.
 *
 * It used to be a plain <img src="/nikola.jpg">: the 2170×2175, 512 KB
 * original served above the fold into a 224 px slot, on every locale. Built
 * through <Image> with densities it is resized to 1x/1.5x/2x and the largest
 * candidate is a few tens of kilobytes.
 *
 * Run after `npm run build`: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const ABOUT_PAGES = ['about', 'en/about', 'ru/about', 'sr-Latn/about'];

test('the original is not published as a static asset any more', () => {
  assert.equal(existsSync(join(ROOT, 'public/nikola.jpg')), false);
  assert.equal(existsSync(join(DIST, 'nikola.jpg')), false);
});

for (const page of ABOUT_PAGES) {
  test(`${page}/ serves the portrait resized, with density candidates, under 60 KB`, () => {
    const html = readFileSync(join(DIST, page, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /nikola\.jpg/);
    // The portrait is the <img> built from src/assets/nikola.jpg (the hashed
    // name keeps the stem); it carries a srcset with the 2x candidate and
    // points into the built asset directory.
    const img = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).find((tag) => /\/_astro\/nikola\./.test(tag));
    assert.ok(img, 'portrait <img> present');
    const src = img.match(/\bsrc="([^"]+)"/)?.[1];
    const srcset = img.match(/\bsrcset="([^"]+)"/)?.[1];
    assert.ok(src?.startsWith('/_astro/'), `src is a built asset: ${src}`);
    assert.ok(srcset?.includes(' 2x'), `srcset has a 2x candidate: ${srcset}`);
    assert.match(img, /\bwidth="224"/);
    assert.match(img, /\bheight="224"/);
    const candidates = [src, ...srcset.split(',').map((c) => c.trim().split(/\s+/)[0])];
    for (const candidate of new Set(candidates)) {
      const file = join(DIST, candidate);
      assert.ok(existsSync(file), `${candidate} built`);
      assert.ok(statSync(file).size < 60_000, `${candidate} is ${statSync(file).size} bytes`);
    }
  });
}
