/**
 * Spam detection and content validation utilities
 */

/**
 * Check if text contains gibberish or spam patterns
 * @param text - Text to analyze
 * @returns boolean - true if content appears legitimate, false if spam/gibberish
 */
export function isValidContent(text: string): boolean {
  if (!text || text.trim().length === 0) {
    return false
  }

  const cleanText = text.trim()

  // Check minimum length
  if (cleanText.length < 2) {
    return false
  }

  // Check for excessive consonants (gibberish like "qdgFkpOrKxFhjmjzsoY")
  const consonantRatio = (cleanText.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length / cleanText.length
  if (consonantRatio > 0.8) {
    return false
  }

  // Check for random case mixing typical of bots (like "QdGfKpOrKx")
  const upperCount = (cleanText.match(/[A-Z]/g) || []).length
  const lowerCount = (cleanText.match(/[a-z]/g) || []).length
  const totalLetters = upperCount + lowerCount

  if (totalLetters > 5) {
    const mixedCaseRatio = Math.min(upperCount, lowerCount) / totalLetters
    // If alternating case is too frequent, it's suspicious
    if (mixedCaseRatio > 0.4 && mixedCaseRatio < 0.6) {
      return false
    }
  }

  // Check for common spam patterns
  const spamPatterns = [
    /(.)\1{5,}/i, // Same character repeated 6+ times
    /^[^aeiou\s]{10,}$/i, // 10+ consonants with no vowels or spaces
    /\d{10,}/, // 10+ consecutive digits
    /^[A-Z]{3}[a-z]{2}[A-Z]{2}/,  // Pattern like "QDGfkPO" (caps-lower-caps)
  ]

  for (const pattern of spamPatterns) {
    if (pattern.test(cleanText)) {
      return false
    }
  }

  return true
}

/**
 * Check if email is from a disposable/temporary email service
 * @param email - Email address to check
 * @returns boolean - true if email appears legitimate, false if disposable
 */
export function isValidEmail(email: string): boolean {
  // Common disposable email domains
  const disposableDomains = [
    'tempmail.com',
    'throwaway.email',
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
    'temp-mail.org',
    'getnada.com',
    'trashmail.com',
    'sharklasers.com',
    'guerrillamail.info',
    'grr.la',
    'spam4.me',
    'maildrop.cc',
  ]

  const emailDomain = email.split('@')[1]?.toLowerCase()

  if (!emailDomain) {
    return false
  }

  return !disposableDomains.includes(emailDomain)
}

/**
 * Check if name appears legitimate (not gibberish)
 * @param name - Name to validate
 * @returns boolean - true if name appears legitimate
 */
export function isValidName(name: string): boolean {
  if (!name || name.trim().length < 2) {
    return false
  }

  const cleanName = name.trim()

  // Name should have reasonable length (not too long)
  if (cleanName.length > 100) {
    return false
  }

  // Check for vowels (real names have vowels)
  const hasVowels = /[aeiou]/i.test(cleanName)
  if (!hasVowels) {
    return false
  }

  // Use general content validation
  return isValidContent(cleanName)
}

/**
 * Comprehensive form validation for bot detection
 * @param data - Form data to validate
 * @returns { isValid: boolean, reason?: string }
 */
export function validateFormSubmission(data: {
  fullName: string
  email: string
  website?: string
  formFillTime?: number
}): { isValid: boolean; reason?: string } {
  // Check honeypot
  if (data.website && data.website.trim().length > 0) {
    return { isValid: false, reason: 'Honeypot field filled' }
  }

  // Check form fill time (too fast = bot)
  // Minimum 3 seconds to fill the form
  if (data.formFillTime !== undefined && data.formFillTime < 3) {
    return { isValid: false, reason: 'Form submitted too quickly' }
  }

  // Validate name
  if (!isValidName(data.fullName)) {
    return { isValid: false, reason: 'Invalid name format' }
  }

  // Validate email
  if (!isValidEmail(data.email)) {
    return { isValid: false, reason: 'Invalid or disposable email' }
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { isValid: false, reason: 'Invalid email format' }
  }

  return { isValid: true }
}
