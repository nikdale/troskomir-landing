/**
 * The Cyrillic and Latin Serbian copy are both hand-written, so they drift —
 * and drift is how `говеѝе пршуте` survived. That word contains U+045D
 * (Cyrillic i with grave) where `ђ` belongs: invisible to the eye, invisible
 * to spellcheck, and it shipped.
 *
 * Two guards:
 *   1. no character from outside the Serbian alphabet in either script;
 *   2. the Cyrillic, transliterated, says the same thing as the Latin.
 *
 * Run: node --test tests/*.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const SOURCE = new URL('../src/i18n/translations.ts', import.meta.url).pathname;
const source = readFileSync(SOURCE, 'utf8');

const section = (from, to) =>
  source.slice(source.indexOf(from), source.indexOf(to));

const ENTRY = /"([\w.]+)":\s*\n?\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/g;
function entries(block) {
  const out = {};
  for (const m of block.matchAll(ENTRY)) out[m[1]] = m[2] ?? m[3] ?? '';
  return out;
}

const cyrillic = entries(section('\n  sr: {', '\n  "sr-Latn": {'));
const latin = entries(section('\n  "sr-Latn": {', '\n  en: {'));

// Serbian Cyrillic has exactly 30 letters. Anything else here — й, ѝ, ы, э —
// came from a Russian keyboard layout or a bad paste.
const SERBIAN_CYRILLIC = new Set(
  'абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ',
);

test('the Cyrillic copy uses only Serbian Cyrillic letters', () => {
  for (const [key, value] of Object.entries(cyrillic)) {
    for (const ch of value) {
      const isCyrillicBlock = ch >= 'Ѐ' && ch <= 'ӿ';
      assert.ok(
        !isCyrillicBlock || SERBIAN_CYRILLIC.has(ch),
        `sr.${key} contains ${JSON.stringify(ch)} (U+${ch
          .codePointAt(0)
          .toString(16)
          .toUpperCase()
          .padStart(4, '0')}), which is not a Serbian letter`,
      );
    }
  }
});

test('the Latin copy contains no Cyrillic homoglyphs', () => {
  // The mirror failure, and the harder one to spot: a Cyrillic `е` inside a
  // Latin word looks identical and breaks search, sorting and any future
  // transliteration.
  for (const [key, value] of Object.entries(latin)) {
    for (const ch of value) {
      assert.ok(
        !(ch >= 'Ѐ' && ch <= 'ӿ'),
        `sr-Latn.${key} contains Cyrillic ${JSON.stringify(ch)}`,
      );
    }
  }
});

test('both scripts carry the same keys', () => {
  assert.deepEqual(
    Object.keys(cyrillic).sort(),
    Object.keys(latin).sort(),
    'a key present in one script and missing from the other renders blank',
  );
});

const TABLE = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ђ: 'đ', е: 'e', ж: 'ž', з: 'z',
  и: 'i', ј: 'j', к: 'k', л: 'l', љ: 'lj', м: 'm', н: 'n', њ: 'nj', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', ћ: 'ć', у: 'u', ф: 'f', х: 'h', ц: 'c',
  ч: 'č', џ: 'dž', ш: 'š',
};

const transliterate = (text) =>
  [...text]
    .map((ch) => {
      const mapped = TABLE[ch.toLowerCase()];
      if (!mapped) return ch;
      return ch === ch.toLowerCase()
        ? mapped
        : mapped[0].toUpperCase() + mapped.slice(1);
    })
    .join('');

// The product name is deliberately "Трошкомир" in Cyrillic and plain-ASCII
// "Troskomir" in Latin — it matches the domain and the store listing.
const normalise = (text) =>
  transliterate(text)
    .replace(/Troškomir/g, 'Troskomir')
    .replace(/troškomir/g, 'troskomir')
    .toLowerCase()
    .replace(/[^a-zžćčđš0-9]/g, '');

test('the two scripts say the same thing', () => {
  for (const key of Object.keys(cyrillic)) {
    assert.equal(
      normalise(cyrillic[key]),
      normalise(latin[key]).replace(/[^a-zžćčđš0-9]/g, ''),
      `sr and sr-Latn diverge for "${key}" — they are hand-written, so a wording change to one has to be made to the other`,
    );
  }
});
