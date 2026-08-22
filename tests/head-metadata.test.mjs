/**
 * Guards the contents of every built page's <head>.
 *
 * Two different failures live here, and both are silent:
 *
 * 1. The CSP. GitHub Pages on a custom domain gives no control over response
 *    headers, so the policy is a <meta> tag, and the only way to allow the
 *    inline scripts this site ships is a per-page SHA-256 — computed after the
 *    build by scripts/apply-csp-hashes.mjs, because DeleteAccount, About and
 *    /open all interpolate locale-specific values into their script bodies.
 *    If that step is skipped, every page ships `'unsafe-inline'` and nothing
 *    breaks visibly; if a hash is wrong, the browser refuses to run the
 *    script and the account-deletion form — a GDPR-facing flow Play checks —
 *    silently stops working. So this recomputes the hashes from the emitted
 *    bytes and asserts each page's own policy covers its own scripts.
 *
 * 2. The per-page title/description/canonical/og set, which is what keeps 21
 *    pages from being folded into one search result.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

/** The unresolved directive the layout emits and the post-build pass replaces. */
const PLACEHOLDER = "script-src 'self' 'unsafe-inline'";

const EXECUTABLE = /^(text\/javascript|application\/javascript|module)$/i;

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

function attr(html, pattern) {
  return html.match(pattern)?.[1];
}

function cspOf(html, name) {
  const content = attr(
    html,
    /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"/i,
  );
  assert.ok(content, `${name} ships no Content-Security-Policy meta tag`);
  return content.replaceAll('&#39;', "'").replaceAll('&quot;', '"');
}

function scriptSrcOf(html, name) {
  const directive = cspOf(html, name)
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('script-src'));
  assert.ok(directive, `${name} has a CSP with no script-src directive`);
  return directive;
}

/**
 * The bytes the browser hashes: everything between the tags, verbatim. Written
 * out here rather than imported from scripts/apply-csp-hashes.mjs on purpose —
 * a test that reuses the extraction it is checking would agree with the script
 * even when both are wrong.
 */
function inlineScripts(html) {
  const bodies = [];
  let cursor = 0;
  while (true) {
    const open = html.indexOf('<script', cursor);
    if (open === -1) break;
    const openEnd = html.indexOf('>', open);
    const close = html.indexOf('</script>', openEnd);
    assert.notEqual(close, -1, 'unterminated <script> in built HTML');
    const attrs = html.slice(open + '<script'.length, openEnd);
    cursor = close + '</script>'.length;
    if (/\bsrc\s*=/.test(attrs)) continue; // external, covered by 'self'
    const type = attrs.match(/\btype\s*=\s*["']([^"']*)["']/);
    if (type && !EXECUTABLE.test(type[1])) continue; // data, never executed
    bodies.push(html.slice(openEnd + 1, close));
  }
  return bodies;
}

const sha256 = (body) => createHash('sha256').update(body, 'utf8').digest('base64');

test('the site still builds 21 pages', () => {
  assert.equal(PAGES.length, 21, `expected 21 built pages, found ${PAGES.length}`);
});

test('no built page allows inline script', () => {
  for (const { name, html } of PAGES) {
    assert.doesNotMatch(
      scriptSrcOf(html, name),
      /'unsafe-inline'/,
      `${name} allows inline script — did \`npm run build\` skip ` +
        'scripts/apply-csp-hashes.mjs?',
    );
  }
});

test('no built page ships the unresolved placeholder anywhere in it', () => {
  // Not just inside the meta tag: the layout used to explain the placeholder in
  // an HTML comment beside it, which shipped the string to every visitor and
  // made this exact question un-greppable.
  for (const { name, html } of PAGES) {
    assert.ok(
      !html.includes(PLACEHOLDER),
      `${name} still contains "${PLACEHOLDER}"`,
    );
  }
});

test("every inline script is allowed by its own page's CSP", () => {
  let hashed = 0;
  for (const { name, html } of PAGES) {
    const directive = scriptSrcOf(html, name);
    for (const body of inlineScripts(html)) {
      const hash = sha256(body);
      hashed += 1;
      assert.ok(
        directive.includes(`'sha256-${hash}'`),
        `${name} ships an inline script whose hash sha256-${hash} is not in ` +
          `its own script-src (${directive}). The browser will refuse to run ` +
          'it. If this is the delete-account page, the deletion flow is dead.',
      );
    }
  }
  // About, DeleteAccount and /open: four pages each for the first two, one for
  // /open. A drop to zero would mean the extraction above stopped matching and
  // the assertions inside the loop never ran.
  assert.equal(hashed, 9, `expected 9 inline scripts across dist, found ${hashed}`);
});

test('the delete-account pages carry a distinct hash per locale', () => {
  // The inline script interpolates the translated strings via define:vars, so a
  // hash shared between two locales would mean the interpolation stopped
  // happening — or that a page is quietly allowing a body it does not ship.
  const pages = PAGES.filter(({ name }) => name.endsWith('/delete-account/'));
  assert.equal(pages.length, 4, 'expected /delete-account/ in all four locales');

  const hashes = new Map();
  for (const { name, html } of pages) {
    const bodies = inlineScripts(html);
    assert.equal(bodies.length, 1, `${name} should ship exactly one inline script`);
    assert.match(bodies[0], /account-deletion\/request/);
    hashes.set(name, sha256(bodies[0]));
  }
  assert.equal(
    new Set(hashes.values()).size,
    4,
    `delete-account hashes are not all distinct: ${[...hashes].join(', ')}`,
  );
});

test('the CSP still permits only the API as a network destination', () => {
  for (const { name, html } of PAGES) {
    const csp = cspOf(html, name);
    assert.match(csp, /connect-src 'self' https:\/\/[^ ;]+/, `${name} connect-src`);
    assert.match(csp, /object-src 'none'/, `${name} object-src`);
    assert.match(csp, /base-uri 'self'/, `${name} base-uri`);
  }
});

test('every page has its own title and description', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const { name, html } of PAGES) {
    const title = attr(html, /<title>([^<]+)<\/title>/);
    const description = attr(html, /<meta name="description" content="([^"]+)"/);
    assert.ok(title, `${name} has no <title>`);
    assert.ok(description, `${name} has no meta description`);
    titles.add(title);
    descriptions.add(description);
  }
  assert.equal(titles.size, PAGES.length, 'two pages share a <title>');
  assert.equal(descriptions.size, PAGES.length, 'two pages share a description');
});

test('canonical, og:url and the link preview image stay in agreement', () => {
  for (const { name, html } of PAGES) {
    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
    assert.ok(canonical, `${name} has no canonical`);
    assert.equal(ogUrl, canonical, `${name}: og:url disagrees with the canonical`);
    assert.match(html, /<meta property="og:image" content="[^"]+og-image\.png"/);
    assert.match(html, /<meta property="og:image:width" content="1200"/);
    assert.match(html, /<meta property="og:image:height" content="630"/);
  }
});
