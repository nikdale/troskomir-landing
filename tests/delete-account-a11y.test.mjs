/**
 * The account-deletion page reports everything — wrong code, rate limit,
 * network failure, and the confirmation that an account is gone — by revealing
 * a <div>. Neither div carried a role or aria-live, so a screen-reader user
 * submitted the form and heard nothing back, on the one flow where "did that
 * work?" has a legal answer. `grep -rn 'role="alert"' src/` returned nothing at
 * all before this.
 *
 * Checked against the built pages, in every locale, because the component is
 * rendered four times and the script is inlined per page.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const LOCALES = ['', 'en/', 'ru/', 'sr-Latn/'];

const pages = LOCALES.map((prefix) => ({
  name: `/${prefix}delete-account/`,
  html: readFileSync(join(DIST, prefix, 'delete-account', 'index.html'), 'utf8'),
}));

/** The opening tag of an element by id, however its attributes are ordered. */
function tag(html, id) {
  const match = html.match(new RegExp(`<div[^>]*\\bid="${id}"[^>]*>`));
  assert.ok(match, `#${id} is missing from the page`);
  return match[0];
}

test('the error region is an assertive live region', () => {
  for (const { name, html } of pages) {
    const alert = tag(html, 'da-alert');
    // role="alert" carries assertive semantics on its own; aria-live is stated
    // as well because assistive tech support for the implicit value is not
    // uniform, and an error that waits for a pause is an error that is missed.
    assert.match(alert, /role="alert"/, `${name}: #da-alert has no role`);
    assert.match(alert, /aria-live="assertive"/, `${name}: #da-alert is not live`);
    assert.match(alert, /aria-atomic="true"/, `${name}: #da-alert is not atomic`);
  }
});

test('the error region is rendered on load, empty, not created on demand', () => {
  for (const { name, html } of pages) {
    const alert = tag(html, 'da-alert');
    assert.match(alert, /class="hidden /, `${name}: #da-alert should start hidden`);
    assert.match(
      html,
      new RegExp(`${alert.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</div>`),
      `${name}: #da-alert must ship empty so the live region already exists`,
    );
  }
});

test('a message is written only after the region is visible', () => {
  // A `display: none` element is not in the accessibility tree, so text set
  // while the box is still hidden can be published with nothing listening.
  for (const { name, html } of pages) {
    const body = html.match(/function showAlert\(message\) \{([\s\S]*?)\n  \}/);
    assert.ok(body, `${name}: showAlert() not found in the inlined script`);
    const source = body[1];
    const unhide = source.indexOf("classList.remove('hidden')");
    const write = source.indexOf('textContent = message');
    assert.notEqual(unhide, -1, `${name}: showAlert() never unhides the region`);
    assert.notEqual(write, -1, `${name}: showAlert() never writes the message`);
    assert.ok(
      unhide < write,
      `${name}: showAlert() writes the message before revealing the region`,
    );
    assert.match(
      source,
      /requestAnimationFrame/,
      `${name}: the message should land as a change to an already-rendered region`,
    );
  }
});

test('hiding the error clears it, so it cannot be re-announced later', () => {
  for (const { name, html } of pages) {
    const body = html.match(/function hideAlert\(\) \{([\s\S]*?)\n  \}/);
    assert.ok(body, `${name}: hideAlert() not found`);
    assert.match(body[1], /textContent = ''/, `${name}: hideAlert() leaves stale text`);
  }
});

test('the success confirmation is a polite live region that receives focus', () => {
  for (const { name, html } of pages) {
    const success = tag(html, 'da-success');
    assert.match(success, /role="status"/, `${name}: #da-success has no role`);
    assert.match(success, /aria-live="polite"/, `${name}: #da-success is not live`);
    // Its copy is server-rendered, so revealing it changes nothing a live
    // region would notice — focus is what gets it read out.
    assert.match(success, /tabindex="-1"/, `${name}: #da-success is not focusable`);
    assert.match(
      html,
      /successBox\.classList\.remove\('hidden'\);\s*(?:\/\/[^\n]*\n\s*)*successBox\.focus\(\);/,
      `${name}: nothing moves focus to the confirmation after it is revealed`,
    );
  }
});
