/**
 * Common helper functions for the kreaty frontend
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date (e.g., "Mar 10, 2024")
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format currency to readable string
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: "USD")
 * @returns {string} Formatted currency (e.g., "$1,234.56")
 */
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1,234")
 */
export const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, length = 50) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to kebab-case
 * @param {string} str - String to convert
 * @returns {string} Kebab-case string
 */
export const toKebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone object (for simple objects)
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Get value from nested object
 * @param {Object} obj - Object to search
 * @param {string} path - Path to value (e.g., "user.profile.name")
 * @returns {*} Value at path or undefined
 */
export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, prop) => current?.[prop], obj);
};

/**
 * Sleep/delay for async operations
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Check if URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Group array by property
 * @param {Array} array - Array to group
 * @param {string} key - Property to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Flatten nested array
 * @param {Array} array - Array to flatten
 * @returns {Array} Flattened array
 */
export const flattenArray = (array) => {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
};

/**
 * Get unique values from array
 * @param {Array} array - Array to deduplicate
 * @returns {Array} Array with unique values
 */
export const getUniqueValues = (array) => {
  return [...new Set(array)];
};

/**
 * Remove duplicates from array of objects
 * @param {Array} array - Array of objects
 * @param {string} key - Property to check for duplicates
 * @returns {Array} Array with unique objects
 */
export const removeDuplicates = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Sort array of objects by property
 * @param {Array} array - Array to sort
 * @param {string} key - Property to sort by
 * @param {string} order - "asc" or "desc"
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, order = "asc") => {
  return [...array].sort((a, b) => {
    if (order === "desc") return b[key] > a[key] ? 1 : -1;
    return a[key] > b[key] ? 1 : -1;
  });
};
