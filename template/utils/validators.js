/**
 * Form and data validators for the kreaty frontend
 */

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email) return { valid: false, error: "Email is required" };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  return { valid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validatePassword = (password) => {
  if (!password) return { valid: false, error: "Password is required" };
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }
  return { valid: true, error: null };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateUsername = (username) => {
  if (!username) return { valid: false, error: "Username is required" };
  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      valid: false,
      error: "Username can only contain letters, numbers, - and _",
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateUrl = (url) => {
  if (!url) return { valid: false, error: "URL is required" };
  try {
    new URL(url);
    return { valid: true, error: null };
  } catch (err) {
    return { valid: false, error: "Invalid URL" };
  }
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = "Field") => {
  if (!value || value.trim() === "") {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true, error: null };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateMinLength = (value, minLength, fieldName = "Field") => {
  if (!value || value.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateMaxLength = (value, maxLength, fieldName = "Field") => {
  if (value && value.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`,
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateRange = (value, min, max, fieldName = "Field") => {
  if (value < min || value > max) {
    return {
      valid: false,
      error: `${fieldName} must be between ${min} and ${max}`,
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number to validate
 * @returns {Object} { valid: boolean, error: string }
 */
export const validatePhone = (phone) => {
  if (!phone) return { valid: false, error: "Phone number is required" };
  const regex = /^[\d\s\-\+\(\)]+$/;
  if (!regex.test(phone) || phone.replace(/\D/g, "").length < 7) {
    return { valid: false, error: "Invalid phone number" };
  }
  return { valid: true, error: null };
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateFileType = (file, allowedTypes = ["image/jpeg", "image/png"]) => {
  if (!file) return { valid: false, error: "File is required" };
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${allowedTypes.join(", ")}`,
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeInMB - Maximum file size in MB
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateFileSize = (file, maxSizeInMB = 5) => {
  if (!file) return { valid: false, error: "File is required" };
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: `File size must not exceed ${maxSizeInMB}MB`,
    };
  }
  return { valid: true, error: null };
};

/**
 * Validate form object against rules
 * @param {Object} formData - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  for (const field in rules) {
    const rule = rules[field];
    const value = formData[field];

    if (rule.required && !value) {
      errors[field] = `${field} is required`;
      isValid = false;
    } else if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      isValid = false;
    } else if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
      isValid = false;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
      isValid = false;
    }
  }

  return { valid: isValid, errors };
};
