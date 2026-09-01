// Store listings live in src/site-config.ts (both Play and App Store are
// hardcoded there). Env vars are optional overrides: if present they must
// be HTTPS, if absent the site-config default is used.
const optional = [
  ['PUBLIC_PLAY_STORE_URL', process.env.PUBLIC_PLAY_STORE_URL],
  ['PUBLIC_APP_STORE_URL', process.env.PUBLIC_APP_STORE_URL],
];

for (const [name, value] of optional) {
  if (!value) {
    console.log(`${name} unset — using the default in src/site-config.ts`);
    continue;
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute HTTPS store URL`);
  }
  if (url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS`);
  }
}

console.log('Release store URLs are configured.');
