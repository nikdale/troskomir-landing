#!/usr/bin/env node
/**
 * Renders public/og-image.png — the 1200×630 card Open Graph and Twitter ask
 * for.
 *
 * `og:image` used to point at public/app-icon.png, which is 1024×1024. A
 * square image in a link preview is either letterboxed into a small thumbnail
 * or centre-cropped, so the one place the site gets to introduce itself was
 * showing a fragment of a wallet glyph.
 *
 * Deliberately NOT wired into `npm run build`: the output is committed, and
 * the text here is rasterised through fontconfig, so the font that resolves on
 * a GitHub Actions runner is not the font that resolves on a workstation.
 * Baking that difference into every deploy would make the artifact drift
 * silently. Run it by hand (`node scripts/build-og-image.mjs`) when the icon
 * or the wordmark changes, look at the result, and commit it.
 *
 * The card carries the wordmark and the domain and no tagline: one image
 * serves all four locales, and og:title/og:description already carry the
 * localised copy.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;

// src/styles/global.css — same six roles as the app's dark palette.
const BG = '#0c0d10';
const SURFACE = '#15171b';
const BORDER = '#262a31';
const TEXT = '#e7e9ec';
const ACCENT = '#7c8cf8';

const ICON = 300;
const ICON_X = 108;
const ICON_Y = (HEIGHT - ICON) / 2;
const ICON_RADIUS = 66; // matches the squircle Android/iOS crop the icon expects

// Inter is self-hosted as woff2, which fontconfig cannot load, so the
// wordmark falls back to whichever grotesque is installed. Noto Sans is the
// nearest match that also covers Cyrillic — a Latin-only fallback would
// render "Трошкомир" as boxes.
const FONT = 'Inter, Noto Sans, DejaVu Sans, sans-serif';

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect x="40" y="40" width="${WIDTH - 80}" height="${HEIGHT - 80}"
        rx="28" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2"/>
  <text x="480" y="300" font-family="${FONT}" font-size="92" font-weight="700"
        fill="${TEXT}">Трошкомир</text>
  <rect x="482" y="336" width="120" height="4" rx="2" fill="${ACCENT}"/>
  <text x="480" y="404" font-family="${FONT}" font-size="34" font-weight="500"
        fill="${ACCENT}">troskomir.stryna.com</text>
</svg>
`);

const iconMask = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${ICON}" height="${ICON}">
  <rect width="${ICON}" height="${ICON}" rx="${ICON_RADIUS}" fill="#fff"/>
</svg>
`);

const icon = await sharp(`${root}public/app-icon.png`)
  .resize(ICON, ICON)
  .composite([{ input: iconMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

const out = `${root}public/og-image.png`;
const info = await sharp(background)
  .composite([{ input: icon, left: ICON_X, top: Math.round(ICON_Y) }])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`og-image.png written: ${info.width}×${info.height}, ${info.size} bytes`);
