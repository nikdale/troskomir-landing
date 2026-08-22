#!/usr/bin/env node
/**
 * Replaces `script-src 'self' 'unsafe-inline'` in every built page with the
 * SHA-256 of that page's own inline scripts.
 *
 * Why this is a post-build pass and not part of the layout: three components
 * ship inline scripts (About, DeleteAccount, /open) and all three carry
 * `define:vars`, so their bodies differ per locale — nine distinct scripts
 * across 21 pages. A hash cannot be computed while the layout that has to
 * declare it is still rendering. Reading the emitted HTML afterwards is the
 * only place the exact bytes the browser will hash actually exist.
 *
 * `astro dev` never runs this, which is why the source keeps 'unsafe-inline':
 * a placeholder token there would break the dev server instead. The guard
 * against forgetting the step is tests/head-metadata.test.mjs, which fails if
 * any built page still allows inline script.
 *
 * `style-src` is left alone on purpose. Tailwind and Astro both emit inline
 * style attributes, which no hash covers — that half of the CSP cannot be
 * tightened from here.
 *
 * Run by `npm run build`. Exits non-zero on anything it does not recognise,
 * because a CSP that silently fails open is worse than no pass at all.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

const PERMISSIVE = "script-src 'self' 'unsafe-inline'";

// Element-level attributes and the raw text between the tags. `[\s\S]*?` is
// deliberate: a script body contains newlines and the shortest match ends at
// the first `</script>`, which is also where the browser ends it.
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;

/** JS types the browser executes; anything else is data and is never hashed. */
const EXECUTABLE = /^(text\/javascript|application\/javascript|module)$/i;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(SCRIPT)) {
    if (/\bsrc\s*=/.test(attrs)) continue; // external — covered by 'self'
    const type = attrs.match(/\btype\s*=\s*["']([^"']*)["']/);
    if (type && !EXECUTABLE.test(type[1])) continue;
    hashes.add(createHash('sha256').update(body, 'utf8').digest('base64'));
  }
  return [...hashes];
}

const files = await htmlFiles(DIST);
if (files.length === 0) {
  throw new Error('No HTML in dist/ — run `astro build` before this script.');
}

let inlineTotal = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');

  if (!html.includes(PERMISSIVE)) {
    throw new Error(
      `${file} does not carry the expected \`${PERMISSIVE}\` directive. ` +
        'Either the layout stopped emitting the CSP meta tag or the directive ' +
        'was reworded — fix one of the two rather than shipping a page with ' +
        'an unchecked policy.',
    );
  }

  const hashes = inlineScriptHashes(html);
  inlineTotal += hashes.length;

  const directive = ["script-src 'self'", ...hashes.map((h) => `'sha256-${h}'`)].join(' ');
  await writeFile(file, html.replaceAll(PERMISSIVE, directive), 'utf8');
}

console.log(
  `CSP script-src pinned on ${files.length} page(s); ` +
    `${inlineTotal} inline script hash(es) allowed, 'unsafe-inline' removed.`,
);
