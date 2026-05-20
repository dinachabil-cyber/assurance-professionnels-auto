export function get(obj, path, fallback = null) {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {return fallback;}
    result = result[key];
  }
  return result ?? fallback;
}

export function setConsentCookie(prefs) {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 6);
  const encoded = encodeURIComponent(JSON.stringify(prefs));
  document.cookie = `aksamConsent=${encoded}; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;
}

export function getConsentCookie() {
  const match = document.cookie.match(/aksamConsent=([^;]+)/);
  if (!match) {return null;}
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}