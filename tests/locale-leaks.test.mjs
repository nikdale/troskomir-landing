/**
 * Text from one locale must not surface on another locale's page.
 *
 *  - V-L10N-01: en and ru deliberately have no `features.joke` (an empty
 *    string). The translator used `||`, which treats "" as missing and fell
 *    back to the Serbian Cyrillic line, so the English and Russian homepages
 *    printed "свашта Трошко умије…".
 *  - V-L10N-05: the Cyrillic and Russian legal documents named the data
 *    controller in Latin script.
 *
 * Checked against the built pages. Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const page = (path) => readFileSync(join(DIST, path, 'index.html'), 'utf8');
const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

test('the Serbian joke line stays on the Serbian homepages', () => {
  assert.match(text(page('')), /свашта Трошко умије/);
  assert.match(text(page('sr-Latn')), /svašta Troško umije/);
  for (const prefix of ['en', 'ru']) {
    const body = text(page(prefix));
    assert.doesNotMatch(body, /свашта Трошко|svašta Troško/, `/${prefix}/ shows the Serbian joke line`);
  }
});

test('the legal documents name the controller in their own script', () => {
  const expected = {
    '': 'Никола Дашић',
    'sr-Latn/': 'Nikola Dašić',
    'en/': 'Nikola Dašić',
    'ru/': 'Никола Дашич (Nikola Dašić)',
  };
  for (const [prefix, name] of Object.entries(expected)) {
    for (const doc of ['privacy', 'terms']) {
      const body = text(page(`${prefix}${doc}`));
      assert.ok(body.includes(name), `/${prefix}${doc}/ does not name the controller as ${name}`);
    }
  }
  // Serbian Cyrillic pages: no Latin spelling of the name at all.
  for (const doc of ['privacy', 'terms']) {
    assert.ok(!text(page(doc)).includes('Nikola Dašić'), `/${doc}/ still names the controller in Latin`);
  }
});
