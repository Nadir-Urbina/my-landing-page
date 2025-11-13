/**
 * Verify reCAPTCHA token on the server side
 * @param token - The reCAPTCHA token from the client
 * @returns Promise<boolean> - true if verification succeeds, false otherwise
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('Missing RECAPTCHA_SECRET_KEY environment variable')
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // For reCAPTCHA v3, check both success and score
    // Score ranges from 0.0 to 1.0, where 1.0 is very likely a good interaction
    // We use 0.5 as threshold - adjust based on your needs
    if (data.success && data.score >= 0.7) {
      return true
    }

    console.warn('reCAPTCHA verification failed:', {
      success: data.success,
      score: data.score,
      errors: data['error-codes'],
    })

    return false
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error)
    return false
  }
}
