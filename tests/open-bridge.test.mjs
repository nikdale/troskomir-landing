/**
 * The /open page is the only thing standing between an e-mail button and the
 * app: mail clients refuse to follow `troskomir://`, so every deep link in
 * every e-mail goes through here. If this page stops shipping, or stops
 * allowlisting, the links silently degrade to "opens the marketing site" —
 * which is exactly the state this replaced.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const DIST = new URL('../dist/', import.meta.url).pathname;
const page = () => readFileSync(DIST + 'open/index.html', 'utf8');

test('the bridge page is built', () => {
  assert.ok(
    existsSync(DIST + 'open/index.html'),
    'e-mail buttons point at /open — it has to exist in the built site',
  );
});

test('it hands the browser the custom scheme', () => {
  assert.match(page(), /troskomir:\/\//);
});

test('it allowlists destinations rather than passing ?to= through', () => {
  const html = page();
  assert.match(html, /ALLOWED/);
  assert.match(html, /'expenses\/needs-review'/);
  // The app's own router rejects anything not on its list too; this is the
  // outer half of the same guard.
  assert.match(html, /ALLOWED\.includes\(requested\)/);
});

test('every destination it offers is one the app can actually open', () => {
  // Mirrors _targetsByPath in troskomir-mobile/lib/utils/deep_link_router.dart.
  const appTargets = [
    'overview',
    'expenses',
    'expenses/needs-review',
    'needs-review',
    'incomes',
    'loans',
    'savings',
    'statistics',
    'budgets',
    'trips',
    'household',
    'inbox',
  ];
  const listed = [...page().matchAll(/'([a-z-]+(?:\/[a-z-]+)?)',?\n/g)].map(
    (m) => m[1],
  );
  const offered = listed.filter((t) => appTargets.includes(t));
  assert.ok(offered.length >= 10, `only found ${offered.length} destinations`);
  for (const target of offered) {
    assert.ok(
      appTargets.includes(target),
      `/open offers "${target}" but the app has no route for it`,
    );
  }
});

test('it does not redirect to a store on a timer', () => {
  // On iOS a timed store redirect races the "Open in app?" system prompt and
  // dismisses it, so the link fails for the people who *do* have the app.
  assert.doesNotMatch(page(), /setTimeout\s*\([^)]*location/);
});
