# Troškomir — landing page

Jednostavna teaser stranica za Troškomir, statički sajt napravljen sa
[Astro](https://astro.build/) i [Tailwind CSS](https://tailwindcss.com/),
hostovan na GitHub Pages pod `troskomir.stryna.com`.

## Struktura projekta

```text
/
├── public/
│   ├── favicon.svg
│   └── CNAME              # troskomir.stryna.com
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Privacy.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── .github/workflows/deploy.yml
```

## Komande

| Komanda           | Opis                                        |
| :---------------- | :------------------------------------------ |
| `npm install`      | Instalira zavisnosti                        |
| `npm run dev`      | Pokreće lokalni server na `localhost:4321`  |
| `npm run build`    | Gradi produkcionu verziju u `./dist/`       |
| `npm run preview`  | Pregled produkcione verzije lokalno         |

## Deploy

Sajt se automatski deployuje na GitHub Pages pri svakom push-u na `main`
granu (`.github/workflows/deploy.yml`).

### Jednokratno podešavanje (posle prvog push-a)

1. Settings → Pages → Source: **GitHub Actions** (obično se postavi
   samo od sebe čim workflow prvi put uspešno odradi).
2. Settings → Pages → Custom domain: `troskomir.stryna.com` (repo već
   sadrži `public/CNAME` sa istim sadržajem, pa GitHub treba sam da ga
   prepozna — ali proveri da polje u UI-ju odgovara).
3. DNS (Cloudflare, zona `stryna.com`): CNAME zapis
   `troskomir` → `nikdale.github.io`, **DNS only** (siva boja, ne
   proxy-ovano) dok GitHub ne izda HTTPS sertifikat za domen — nakon
   toga po želji može nazad na proxy.
4. "Enforce HTTPS" u Pages podešavanjima uključi tek kad se sertifikat
   izda (obično par minuta do sat vremena posle DNS propagacije).

## Sadržaj

- Naslov / hero tekst: `src/components/Hero.astro`
- Funkcije: `src/components/Features.astro`
- Privatnost: `src/components/Privacy.astro`
- Kontakt: `src/components/Footer.astro`
- Boje: `src/styles/global.css` (`@theme` blok)
