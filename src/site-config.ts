// Single place to update external links once the real ones are known.
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nikdale/'; // from troskomir-mobile settings_tab.dart
export const TELEGRAM_URL = 'https://t.me/troskomir'; // from troskomir-mobile settings_tab.dart

// Paste real listing URLs once published. Until then leave empty (or '#') so the
// hero shows a "coming soon" state instead of dead links that scroll nowhere.
export const PLAY_STORE_URL = ''; // e.g. https://play.google.com/store/apps/details?id=com.troskomir.troskomir_mobile
export const APP_STORE_URL = ''; // e.g. https://apps.apple.com/app/idXXXXXXXX

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
