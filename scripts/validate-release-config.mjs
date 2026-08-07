const required = [
  ['PUBLIC_PLAY_STORE_URL', process.env.PUBLIC_PLAY_STORE_URL],
  ['PUBLIC_APP_STORE_URL', process.env.PUBLIC_APP_STORE_URL],
];

for (const [name, value] of required) {
  let url;
  try {
    url = new URL(value ?? '');
  } catch {
    throw new Error(`${name} must be an absolute HTTPS store URL`);
  }
  if (url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS`);
  }
}

console.log('Release store URLs are configured.');
