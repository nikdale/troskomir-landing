// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Served from the troskomir.stryna.com custom domain (see public/CNAME),
// so — unlike a plain *.github.io/<repo> deploy — there's no repo-name
// subpath to account for here.
export default defineConfig({
  site: 'https://troskomir.stryna.com',
  vite: {
    plugins: [tailwindcss()]
  }
});
