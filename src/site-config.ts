// Single place to update external links once the real ones are known.
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nikdale/'; // from troskomir-mobile settings_tab.dart
export const TELEGRAM_URL = 'https://t.me/troskomir'; // from troskomir-mobile settings_tab.dart

// Play is live. App Store stays empty until Apple approves — the hero then
// shows a muted "coming soon" badge instead of a dead link. PUBLIC_* env
// vars override either value if set at build time.
const PLAY_STORE_LISTING =
  'https://play.google.com/store/apps/details?id=com.troskomir.troskomir_mobile';

function envUrl(value: string | undefined, fallback: string): string {
  return value && value.length > 0 ? value : fallback;
}

export const PLAY_STORE_URL = envUrl(
  import.meta.env.PUBLIC_PLAY_STORE_URL,
  PLAY_STORE_LISTING,
);
export const APP_STORE_URL = envUrl(import.meta.env.PUBLIC_APP_STORE_URL, '');

/** True when the URL is a real https listing (not empty / '#' / relative junk). */
export function isLiveStoreUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Same backend the mobile app talks to (see troskomir-mobile/lib/config/api_config.dart).
// Used by the account-deletion form, which is the one page here that calls the API.
export const API_BASE_URL = 'https://api.troskomir.stryna.com/api';
