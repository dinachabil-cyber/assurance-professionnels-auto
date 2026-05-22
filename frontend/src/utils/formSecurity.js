const BANNED_WORDS = [
  'bitcoin', 'btc', 'crypto', 'cryptocurrency', '  ', 'airdrop', 'ethereum',
  'litecoin', 'dogecoin', 'nft', 'token', 'coinbase', 'binance', 'blockchain',
  'mining', 'miner', 'investment', 'profit', 'guaranteed', 'casino', 'poker',
  'viagra', 'pharmacy', 'loan', 'debt', 'credit', 'mortgage', 'lending'
];

const URL_PATTERN = /(https?:\/\/|www\.)[^\s]+/i;
const REPEATED_CHARS = /(.)\1{4,}/i;
const VALID_TEXT_PATTERN = /^[A-Za-z\u00C0-\u00FF0-9\s.,''-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMOJI_PATTERN = /[\u2600-\u26FF\u2700-\u27BF]/;

export const validateFieldSecurity = (value, fieldName) => {
  const errors = [];

  if (!value || !value.trim()) {
    return { valid: false, errors: [`${fieldName} is required`] };
  }

  const trimmed = value.trim();
  const isEmail = fieldName.toLowerCase() === 'email' || trimmed.includes('@');

  if (isEmail) {
    if (!EMAIL_PATTERN.test(trimmed)) {
      errors.push('Invalid email format');
    }
    if (URL_PATTERN.test(trimmed)) {
      errors.push('Links are not allowed');
    }
    const lowerValue = trimmed.toLowerCase();
    const foundBanned = BANNED_WORDS.filter(word => lowerValue.includes(word));
    if (foundBanned.length > 0) {
      errors.push('Content contains restricted words');
    }
  } else {
    if (URL_PATTERN.test(trimmed)) {
      errors.push('Links are not allowed');
    }

    const lowerValue = trimmed.toLowerCase();
    const foundBanned = BANNED_WORDS.filter(word => lowerValue.includes(word));
    if (foundBanned.length > 0) {
      errors.push('Content contains restricted words');
    }

    if (REPEATED_CHARS.test(trimmed)) {
      errors.push('Unusual character repetition detected');
    }

    if (EMOJI_PATTERN.test(trimmed)) {
      errors.push('Special characters or emojis are not allowed');
    }

    if (!VALID_TEXT_PATTERN.test(trimmed)) {
      errors.push('Only letters, numbers, and basic punctuation allowed');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateFormSecurity = (formData) => {
  const errors = {};
  let isValid = true;

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'website') {
      return;
    }
    if (!value || (typeof value === 'string' && !value.trim())) {
      return;
    }
    const result = validateFieldSecurity(value, key.charAt(0).toUpperCase() + key.slice(1));
    if (!result.valid) {
      errors[key] = result.errors;
      isValid = false;
    }
  });

  return { valid: isValid, errors };
};

export { BANNED_WORDS, URL_PATTERN, REPEATED_CHARS, VALID_TEXT_PATTERN, EMOJI_PATTERN, EMAIL_PATTERN };