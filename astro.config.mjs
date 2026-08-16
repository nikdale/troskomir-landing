// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Served from the troskomir.stryna.com custom domain (see public/CNAME),
// so — unlike a plain *.github.io/<repo> deploy — there's no repo-name
// subpath to account for here.
export default defineConfig({
  site: 'https://troskomir.stryna.com',
  integrations: [
    // Without a sitemap (and the robots.txt that points at it) the site is
    // effectively invisible to search, and to the crawl a store listing does
    // of its "developer website" — including the privacy-policy URL, which
    // Play re-checks periodically.
    sitemap({
      i18n: {
        defaultLocale: 'sr',
        locales: {
          sr: 'sr-Cyrl',
          'sr-Latn': 'sr-Latn',
          en: 'en',
          ru: 'ru',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
