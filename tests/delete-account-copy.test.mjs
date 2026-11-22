/**
 * The deletion page's copy has to match what the flow and the backend do
 * (VELES V-PRIV-33, V-PRIV-26, V-BE-N8):
 *  - the second step asks for the account password as well as the code, so
 *    the page says so before the user gets there;
 *  - a failed confirm cannot say which of the two was wrong (production
 *    answers a wrong password with 401, and after the backend's single
 *    generic answer every failure is the same 400), so it names both;
 *  - deleted data stays in the encrypted backups until they expire, so
 *    neither the warning nor the confirmation may say it is gone for good
 *    without saying when.
 *
 * Checked against the built pages, in every locale. Run: node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const EXPECT = {
  '': {
    password: /потврђујете тим кодом и лозинком налога/,
    backups: /резервним копијама нестају са тим копијама, најкасније за 60 дана/,
    error: 'Код или лозинка нису тачни, или је код истекао.',
    stale: 'Нетачан или истекао код',
  },
  'sr-Latn/': {
    password: /potvrđujete tim kodom i lozinkom naloga/,
    backups: /rezervnim kopijama nestaju sa tim kopijama, najkasnije za 60 dana/,
    error: 'Kod ili lozinka nisu tačni, ili je kod istekao.',
    stale: 'Netačan ili istekao kod',
  },
  'en/': {
    password: /confirm with that code and your account password/,
    backups: /our backups disappears with those backups, within 60 days/,
    error: 'The code or the password is incorrect, or the code has expired.',
    stale: 'Incorrect or expired code',
  },
  'ru/': {
    password: /подтверждаете удаление этим кодом и паролем аккаунта/,
    backups: /резервных копиях исчезнут вместе с этими копиями не позднее чем через 60 дней/,
    error: 'Неверный код или пароль, либо срок действия кода истёк.',
    stale: 'Неверный или истёкший код',
  },
};

function load(prefix) {
  return readFileSync(join(DIST, prefix, 'delete-account', 'index.html'), 'utf8');
}

/** Visible text, scripts removed. */
function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

for (const [prefix, want] of Object.entries(EXPECT)) {
  const name = `/${prefix}delete-account/`;

  test(`${name} says the password is needed before asking for it`, () => {
    assert.match(text(load(prefix)), want.password);
  });

  test(`${name} says when backups lose the deleted data, in the warning and the confirmation`, () => {
    const body = text(load(prefix));
    const hits = body.match(new RegExp(want.backups.source, 'g')) ?? [];
    assert.equal(hits.length, 2, `${name}: expected the backup note in the warning and in the success message`);
  });

  test(`${name} names both the code and the password when a confirm is refused`, () => {
    const html = load(prefix);
    // The message lives in the inline script's define:vars payload, as JSON.
    assert.ok(html.includes(JSON.stringify(want.error).slice(1, -1)), `${name}: the code-or-password message is missing`);
    assert.ok(!html.includes(want.stale), `${name}: still blames the code alone`);
  });
}
