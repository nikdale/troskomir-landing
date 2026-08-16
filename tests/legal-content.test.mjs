/**
 * Guards the canonical legal documents against silent regressions.
 *
 * Every disclosure asserted here is one a store submission or a supervisory
 * authority depends on. The Play Data Safety form declares crash logs and
 * push tokens; if the policy stops mentioning Firebase, the two disagree and
 * that mismatch is the single most common rejection for an app like this.
 * These are string assertions on purpose — a future edit that quietly drops a
 * required disclosure fails here rather than at review.
 *
 * Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const LOCALE_PREFIXES = ['', 'en/', 'ru/', 'sr-Latn/'];

function page(path) {
  const file = join(DIST, path, 'index.html');
  assert.ok(existsSync(file), `${path} was not built — run \`npm run build\` first`);
  return readFileSync(file, 'utf8');
}

/** Visible text, with tags and entities removed. */
function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ');
}

test('the canonical policy and terms exist in every locale', () => {
  for (const prefix of LOCALE_PREFIXES) {
    for (const doc of ['privacy', 'terms']) {
      const body = text(page(`${prefix}${doc}`));
      assert.ok(body.length > 1500, `${prefix}${doc} is suspiciously short`);
    }
  }
});

test('the policy discloses every third party and data flow', () => {
  // Each of these was missing from all three of the old, divergent policies.
  const required = [
    'Crashlytics',
    'Firebase Cloud Messaging',
    'Hugging Face',
    'suf.purs.gov.rs',
    'suf.poreskaupravars.org',
    'mapr.tax.gov.me',
    'IP',
    'user-agent',
    'nikdale@duck.com',
    'troskomir.stryna.com/delete-account/',
  ];
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    for (const needle of required) {
      assert.ok(
        body.includes(needle),
        `${prefix}privacy does not mention ${needle}`,
      );
    }
  }
});

test('the policy describes the encryption the app actually has', () => {
  // The old backend policy said the app "is not designed around custom
  // cryptographic services", which is false — and read like it was written to
  // justify ITSAppUsesNonExemptEncryption = false.
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    for (const needle of ['AES-256-GCM', 'Argon2id', 'X25519']) {
      assert.ok(body.includes(needle), `${prefix}privacy omits ${needle}`);
    }
  }
});

test('the policy states data-subject rights and the supervisory authority', () => {
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    assert.ok(body.includes('GDPR'), `${prefix}privacy omits GDPR`);
    assert.ok(body.includes('poverenik.rs'), `${prefix}privacy omits the Commissioner`);
    assert.ok(/\b16\b/.test(body), `${prefix}privacy omits a minimum age`);
  }
});

test('the terms carry the disclaimers a finance app needs', () => {
  const en = text(page('en/terms'));
  assert.ok(/not financial, tax, accounting or legal advice/i.test(en));
  assert.ok(/Republic of Serbia/i.test(en), 'no governing law clause');
  assert.ok(/Belgrade/i.test(en), 'no jurisdiction clause');
});

test('every page links the policy, terms and account deletion', () => {
  // Matched without a trailing slash: Astro's directory build emits
  // `href="/privacy"` and GitHub Pages 301s that to `/privacy/`. The canonical
  // URL handed to the stores (legal.ts) does carry the slash.
  for (const prefix of LOCALE_PREFIXES) {
    for (const path of ['', `${prefix}about`]) {
      const html = page(path);
      for (const doc of ['privacy', 'terms', 'delete-account']) {
        assert.ok(
          new RegExp(`href="[^"]*/${doc}/?"`).test(html),
          `/${path} does not link ${doc} — both stores require a reachable policy and support path`,
        );
      }
    }
  }
});

test('a support contact is reachable from the footer', () => {
  const html = page('');
  assert.ok(html.includes('mailto:nikdale@duck.com'));
});

test('no page loads a resource from another origin', () => {
  // Catches a regression back to Google Fonts, which sent every visitor's IP
  // to Google — on the privacy pages of a privacy-branded app.
  const attributes = /(?:src|href)\s*=\s*"(https?:\/\/[^"]+)"/g;
  const allowedAsLinks = ['https://t.me/', 'https://www.linkedin.com/', 'https://troskomir.stryna.com'];
  for (const prefix of LOCALE_PREFIXES) {
    for (const path of ['', `${prefix}privacy`, `${prefix}terms`, `${prefix}about`]) {
      const html = page(path);
      for (const match of html.matchAll(attributes)) {
        const url = match[1];
        const isPlainLink = allowedAsLinks.some((allowed) => url.startsWith(allowed));
        assert.ok(isPlainLink, `/${path} loads ${url} from another origin`);
      }
    }
  }
});

test('robots.txt and the sitemap exist and point at each other', () => {
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/troskomir\.stryna\.com\/sitemap-index\.xml/);
  assert.ok(existsSync(join(DIST, 'sitemap-index.xml')));
  const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  for (const prefix of LOCALE_PREFIXES) {
    assert.ok(
      sitemap.includes(`https://troskomir.stryna.com/${prefix}privacy/`),
      `sitemap omits /${prefix}privacy/`,
    );
  }
});
