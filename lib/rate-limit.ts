/**
 * Simple in-memory rate limiting for API routes
 * For production with multiple servers, consider using Redis
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Store rate limit data in memory
const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, email, etc.)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes default
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    cleanupExpiredEntries()
  }

  if (!entry || now > entry.resetTime) {
    // First request or window expired - create new entry
    const resetTime = now + windowMs
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    })

    return {
      allowed: true,
      remaining: limit - 1,
      resetTime,
    }
  }

  // Increment count
  entry.count++
  rateLimitStore.set(identifier, entry)

  const allowed = entry.count <= limit
  const remaining = Math.max(0, limit - entry.count)

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  }
}

/**
 * Get client IP address from request
 * @param request - Next.js Request object
 * @returns IP address string
 */
export function getClientIp(request: Request): string {
  // Try to get IP from various headers (considering proxies/CDNs)
  const headers = request.headers

  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback
  return 'unknown'
}

/**
 * Clean up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  const entries = Array.from(rateLimitStore.entries())

  for (const [key, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Middleware helper for Next.js API routes
 * @param request - Next.js Request object
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function rateLimit(
  request: Request,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = getClientIp(request)
  return checkRateLimit(ip, limit, windowMs)
}

/**
 * Rate limit specifically for form submissions (stricter limits)
 * @param request - Next.js Request object
 * @param email - User's email address
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function rateLimitFormSubmission(
  request: Request,
  email?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = getClientIp(request)

  // Check IP-based rate limit (3 submissions per 15 minutes)
  const ipLimit = checkRateLimit(`form:${ip}`, 3, 15 * 60 * 1000)

  if (!ipLimit.allowed) {
    return ipLimit
  }

  // If email provided, also check email-based rate limit (2 submissions per hour)
  if (email) {
    const emailLimit = checkRateLimit(`email:${email.toLowerCase()}`, 2, 60 * 60 * 1000)
    if (!emailLimit.allowed) {
      return emailLimit
    }
  }

  return ipLimit
}
