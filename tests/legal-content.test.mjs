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
    'mydatapi.aade.gr',
    'ec.europa.eu',
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

test('the policy admits the offline cache is not behind the vault lock', () => {
  // The app lock protects the encryption vault, not the offline cache — those
  // are separate keys, so cached amounts and descriptions stay readable while
  // the app is "locked". A user reading "lock private data" will assume
  // otherwise, and a privacy policy that lets them is the problem.
  const separateKey = {
    '': /засебним кључем уређаја/,
    'en/': /separate device key/i,
    'ru/': /отдельным ключом устройства/,
    'sr-Latn/': /zasebnim ključem uređaja/,
  };
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    assert.ok(
      separateKey[prefix].test(body),
      `${prefix}privacy does not disclose that the offline cache uses a key of its own`,
    );
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

test('the about bio greets in character and fills in a live age', () => {
  const sr = text(page('about'));
  assert.match(sr, /Помаже Бог/);
  assert.match(sr, /\d{2}-годишњи/);
  assert.doesNotMatch(sr, /\{age\}/);
  assert.match(sr, /креатина/);
  assert.match(sr, /Пролом/);
  assert.match(sr, /Аде Циганлије/);

  const en = text(page('en/about'));
  assert.match(en, /God helps/);
  assert.match(en, /\d{2}-year-old/);
});

test('no page loads a resource from another origin', () => {
  // Catches a regression back to Google Fonts, which sent every visitor's IP
  // to Google — on the privacy pages of a privacy-branded app.
  const attributes = /(?:src|href)\s*=\s*"(https?:\/\/[^"]+)"/g;
  const allowedAsLinks = [
    'https://t.me/',
    'https://www.linkedin.com/',
    'https://troskomir.stryna.com',
    'https://play.google.com/',
    'https://apps.apple.com/',
    // Self-hosted Umami (troskomir-bekend/deploy/analytics) — only present
    // when PUBLIC_ANALYTICS_URL is set at build time, see src/site-config.ts.
    'https://analytics.troskomir.stryna.com',
  ];
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

// VELES (V-PRIV-24, -26, -27, -29): the policy has to describe what the code
// does today, not what it did when it was written. Each needle below is a
// data flow that exists in the backend or the app and that an earlier version
// of the policy left out or contradicted.
const PRIVACY_TRUTH = {
  '': {
    crashToggle: 'Подешавања > Приватност података > Шаљи извештаје о падовима',
    analyticsToggle: 'Подешавања > Приватност података > Шаљи анонимну статистику коришћења',
    onByDefault: /Подразумевано укључено/,
    backups: /резервне копије базе \(шифроване\) чувају се 31 дан.*недељне слике целог сервера.*4 недеље/,
    backupsAfterDeletion: /најкасније 60 дана после брисања/,
    websitePassword: /на веб страници су потребни и код и лозинка налога/,
  },
  'sr-Latn/': {
    crashToggle: 'Podešavanja > Privatnost podataka > Šalji izveštaje o padovima',
    analyticsToggle: 'Podešavanja > Privatnost podataka > Šalji anonimnu statistiku korišćenja',
    onByDefault: /Podrazumevano uključeno/,
    backups: /rezervne kopije baze \(šifrovane\) čuvaju se 31 dan.*nedeljne slike celog servera.*4 nedelje/,
    backupsAfterDeletion: /najkasnije 60 dana posle brisanja/,
    websitePassword: /na veb stranici su potrebni i kod i lozinka naloga/,
  },
  'en/': {
    crashToggle: 'Settings > Data privacy > Send crash reports',
    analyticsToggle: 'Settings > Data privacy > Send anonymous usage statistics',
    onByDefault: /On by default/,
    backups: /nightly database backups \(encrypted\) for 31 days.*weekly images of the whole server.*for 4 weeks/,
    backupsAfterDeletion: /at the latest 60 days after the deletion/,
    websitePassword: /on the website you need both the code and your account password/,
  },
  'ru/': {
    crashToggle: 'Настройки > Конфиденциальность данных > Отправлять отчёты о сбоях',
    analyticsToggle: 'Настройки > Конфиденциальность данных > Отправлять анонимную статистику использования',
    onByDefault: /Включено по умолчанию/,
    backups: /ночные резервные копии базы данных \(зашифрованные\) хранятся 31 день.*еженедельные образы всего сервера.*4 недели/,
    backupsAfterDeletion: /не позднее чем через 60 дней после удаления/,
    websitePassword: /на сайте нужны и код, и пароль учётной записи/,
  },
};

test('the policy names the geo-IP lookup and what it is sent (V-PRIV-24)', () => {
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    assert.ok(body.includes('ipwho.is'), `${prefix}privacy does not disclose ipwho.is`);
  }
});

test('the policy says how long backups keep data, including after deletion (V-PRIV-26)', () => {
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    const want = PRIVACY_TRUTH[prefix];
    assert.match(body, want.backups, `${prefix}privacy omits the backup retention`);
    assert.match(body, want.backupsAfterDeletion, `${prefix}privacy omits what deletion leaves in backups`);
    assert.match(body, /\b15\b/, `${prefix}privacy omits the pre-update snapshot limit`);
  }
});

test('analytics and crash reports are disclosed as on by default, with the switch to turn them off (V-PRIV-29)', () => {
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    const want = PRIVACY_TRUTH[prefix];
    assert.ok(body.includes(want.crashToggle), `${prefix}privacy does not say how to turn crash reports off`);
    assert.ok(body.includes(want.analyticsToggle), `${prefix}privacy does not say how to turn usage statistics off`);
    assert.ok(body.match(new RegExp(want.onByDefault.source, 'g'))?.length >= 1, `${prefix}privacy does not say crash reports are on by default`);
  }
});

test('the policy explains the website deletion needs the code and the password (V-PRIV-33)', () => {
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(`${prefix}privacy`));
    assert.match(body, PRIVACY_TRUTH[prefix].websitePassword, `${prefix}privacy does not explain the password step`);
  }
});

test('the homepage summary no longer claims the data is never shared (V-PRIV-27)', () => {
  // Crash reports go to Google, push text through Google and Apple, sign-in
  // IPs to ipwho.is and receipt lookups to tax portals: "never share it with
  // anyone" was false the day it was written.
  const falseClaims = [
    /никада их не делим ни са ким/,
    /nikada ih ne delim ni sa kim/,
    /never share it with anyone/,
    /don't share it with anyone/,
    /никогда никому их не передаю/,
    /никому не передаю/,
    /Не дели податке са трећим странама, осим/,
    /Ne deli podatke sa trećim stranama, osim/,
    /Share data with third parties, except when you trigger/,
    /Не передаёт данные третьим лицам, кроме случаев/,
  ];
  for (const prefix of LOCALE_PREFIXES) {
    const body = text(page(prefix));
    for (const claim of falseClaims) {
      assert.doesNotMatch(body, claim, `/${prefix} still says ${claim}`);
    }
  }
});
