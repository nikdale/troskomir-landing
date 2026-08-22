import { translations, defaultLang, type Lang, type TranslationKey } from './translations';

export { languages, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] || translations[defaultLang][key] || key;
  };
}

export function getLocalizedPath(path: string, lang: Lang, base: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (lang === defaultLang) {
    return cleanPath ? `${cleanBase}/${cleanPath}` : `${cleanBase}/`;
  }

  return cleanPath ? `${cleanBase}/${lang}/${cleanPath}` : `${cleanBase}/${lang}/`;
}

export function getPathWithoutLang(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] in translations) {
    // The trailing slash is kept deliberately. Astro builds every route as a
    // directory (/about/index.html), the sitemap lists it as /about/, and
    // GitHub Pages 301s /about to /about/. Dropping it here made the hreflang
    // alternates on the localized pages — and now the canonical, which is one
    // of them — point at the redirect rather than the page, which Search
    // Console reports as an invalid alternate instead of following.
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}/` : '/';
  }
  return pathname;
}

const ALL_LANGS: Lang[] = ['sr', 'sr-Latn', 'en', 'ru'];

/**
 * Which locales each route is actually built in.
 *
 * Most routes exist four times over, but /open/ exists only at the root: it is
 * the bridge that turns an e-mail button into a `troskomir://` deep link, it
 * picks its own copy from `?lang=`, and there is deliberately no /en/open/ for
 * a mail client to be sent to. Emitting the full set of alternates regardless
 * therefore advertised three URLs that were never built, and Search Console
 * reported them as invalid alternates — on the one site whose job is to stay
 * crawlable for the Play re-check of the developer website.
 *
 * Derived from src/pages/ rather than hand-listed. `import.meta.glob` is
 * resolved by Vite while building, and only the keys are read, so nothing is
 * imported and no page module is pulled into the layout — but a route that is
 * added, moved, or localized later shows up here on its own. A hand-kept list
 * is exactly the kind of thing that goes stale silently, which is how the
 * three dangling alternates got shipped in the first place.
 */
const routeLocales: Map<string, Lang[]> = (() => {
  const routes = new Map<string, Lang[]>();

  for (const file of Object.keys(import.meta.glob('../pages/**/*.astro'))) {
    const relative = file.slice(file.lastIndexOf('/pages/') + '/pages/'.length);
    const segments = relative
      .replace(/\.astro$/, '')
      .split('/')
      .filter((segment) => segment !== '' && segment !== 'index');

    const lang: Lang = segments[0] in translations ? (segments.shift() as Lang) : defaultLang;
    const path = segments.length > 0 ? `/${segments.join('/')}/` : '/';

    const langs = routes.get(path) ?? [];
    if (!langs.includes(lang)) langs.push(lang);
    routes.set(path, langs);
  }

  return routes;
})();

// hreflang alternates for every language this particular page is built in
export function getAlternateUrls(
  pathname: string,
  siteUrl: string,
  base: string = ''
): { lang: Lang; url: string }[] {
  const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const pathWithoutLang = getPathWithoutLang(pathname);

  // A path the inventory above cannot see is a route that does not come from a
  // file in src/pages (an injected or redirect route). Assuming it is fully
  // localized is the old, wrong behaviour, but assuming the opposite would
  // strip such a page of its canonical too, since the canonical is one of these
  // alternates — so keep the full set and let the dist walk in
  // tests/hreflang-alternates.test.mjs report it.
  const available = routeLocales.get(pathWithoutLang) ?? ALL_LANGS;

  return ALL_LANGS.filter((lang) => available.includes(lang)).map((lang) => ({
    lang,
    url: `${cleanSiteUrl}${getLocalizedPath(pathWithoutLang, lang, base)}`,
  }));
}
