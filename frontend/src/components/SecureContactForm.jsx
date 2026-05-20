  import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const BANNED_WORDS = [
  'bitcoin', 'btc', 'crypto', 'cryptocurrency', 'wallet', 'airdrop', 'ethereum',
  'litecoin', 'dogecoin', 'nft', 'token', 'coinbase', 'binance', 'blockchain',
  'mining', 'miner', 'investment', 'profit', 'guaranteed', 'casino', 'poker',
  'viagra', 'pharmacy', 'loan', 'debt', 'credit', 'mortgage', 'lending'
];

const URL_PATTERN = /((https?:\/\/)?(www\.)?|[a-z0-9.-]+\.)+[a-z]{2,}(\/\S*)?/i;
const REPEATED_CHARS = /(.)\1{4,}/i;
const VALID_TEXT_PATTERN = /^[A-Za-z\u00C0-\u00FF0-9\s.,''-]*$/;
const EMOJI_PATTERN = /[\u2600-\u26FF\u2700-\u27BF]/;

const validateField = (value, fieldName) => {
  const errors = [];

  if (!value || !value.trim()) {
    return { valid: false, errors: [`${fieldName} is required`] };
  }

  const trimmed = value.trim();

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

  return {
    valid: errors.length === 0,
    errors
  };
};

const SecureContactForm = ({ onSubmit, maxNameLength = 50, maxEmailLength = 100, maxMessageLength = 500 }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const honeypotRef = useRef(null);

  const validateAllFields = useCallback(() => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const result = validateField(value, key.charAt(0).toUpperCase() + key.slice(1));
      if (!result.valid) {
        newErrors[key] = result.errors;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(touched).length > 0) {
        validateAllFields();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [formData, touched, validateAllFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const result = validateField(formData[name], name.charAt(0).toUpperCase() + name.slice(1));
    if (!result.valid) {
      setErrors(prev => ({ ...prev, [name]: result.errors }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypotRef.current?.value) {
      return;
    }

    setTouched({ name: true, email: true, message: true });
    const isValid = validateAllFields();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        if (onSubmit) {
          onSubmit();
        }
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Connection error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) => {
    const base = 'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';
    if (touched[field] && errors[field]) {
      return `${base} border-red-500 bg-red-50`;
    }
    return `${base} border-gray-300`;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4" noValidate>
      <div className="hidden">
        <label htmlFor="website">Website (leave empty)</label>
        <input
          ref={honeypotRef}
          type="text"
          id="website"
          name="website"
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxNameLength}
          className={inputClass('name')}
          placeholder="Your name"
        />
        {errors.name && touched.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxEmailLength}
          className={inputClass('email')}
          placeholder="your@email.com"
        />
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={maxMessageLength}
          rows={4}
          className={inputClass('message')}
          placeholder="Your message"
        />
        {errors.message && touched.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus && (
        <div className={`p-3 rounded-lg text-sm ${
          submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}
    </form>
  );
};

SecureContactForm.propTypes = {
  onSubmit: PropTypes.func,
  maxNameLength: PropTypes.number,
  maxEmailLength: PropTypes.number,
  maxMessageLength: PropTypes.number,
};

export default SecureContactForm;