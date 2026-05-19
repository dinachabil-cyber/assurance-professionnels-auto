/**
 * Utility Functions
 * Lightweight helpers for the Assurance Pro Auto application
 */

// Safe get nested property
export function get(obj, path, fallback = null) {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) {return fallback;}
    result = result[key];
  }
  return result ?? fallback;
}

// Format phone number: 0123456789 -> 01 23 45 67 89
export function formatPhone(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 10);
  if (cleaned.length <= 2) {return cleaned;}
  if (cleaned.length <= 4) {return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;}
  if (cleaned.length <= 6) {return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;}
  if (cleaned.length <= 8) {return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;}
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
}

// Format code postal with 5 digits
export function formatCodePostal(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 5);
  return cleaned;
}

// Debounce function
export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Capitalize first letter of each word
export function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

// Generate a unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// Storage helpers for cookie consent
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

// Smooth scroll to element
export function smoothScrollTo(target, offset = 80) {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target;
  if (!element) {return;}
  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// Truncate text
export function truncate(text, length = 160) {
  if (!text) {return '';}
  if (text.length <= length) {return text;}
  return text.slice(0, length).replace(/\s+\S*$/, '') + '…';
}