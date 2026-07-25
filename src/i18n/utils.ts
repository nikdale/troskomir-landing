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
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

// hreflang alternates for every supported language
export function getAlternateUrls(
  pathname: string,
  siteUrl: string,
  base: string = ''
): { lang: Lang; url: string }[] {
  const langs: Lang[] = ['sr', 'sr-Latn', 'en', 'ru'];
  const cleanSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return langs.map((lang) => ({
    lang,
    url: `${cleanSiteUrl}${getLocalizedPath('', lang, base)}`,
  }));
}
