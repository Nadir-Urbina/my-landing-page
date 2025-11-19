import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { validateFormSubmission } from '@/lib/spam-detection'
import { rateLimitFormSubmission } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const resend = new Resend(process.env.RESEND_API_KEY)

// Create admin client for writing interest records
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { email, fullName, website, recaptchaToken, formFillTime } = await req.json()

    // 1. Check rate limiting first (fastest check)
    const rateCheck = rateLimitFormSubmission(req, email)
    if (!rateCheck.allowed) {
      logger.warn('Rate limit exceeded for CAMP interest form', {
        email,
        remaining: rateCheck.remaining,
      })
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          type: 'error',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateCheck.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateCheck.resetTime).toISOString(),
          }
        }
      )
    }

    // 2. Verify reCAPTCHA
    if (!recaptchaToken) {
      logger.warn('Missing reCAPTCHA token for CAMP interest form')
      return NextResponse.json(
        {
          success: false,
          message: 'Security verification required.',
          type: 'error',
        },
        { status: 400 }
      )
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      logger.warn('reCAPTCHA verification failed for CAMP interest form', { email })
      return NextResponse.json(
        {
          success: false,
          message: 'Security verification failed. Please try again.',
          type: 'error',
        },
        { status: 403 }
      )
    }

    // 3. Validate form content (honeypot, timing, content quality)
    const validation = validateFormSubmission({
      fullName,
      email,
      website,
      formFillTime,
    })

    if (!validation.isValid) {
      logger.warn('Form validation failed for CAMP interest form', {
        email,
        fullName,
        reason: validation.reason,
      })
      // Return generic success message to not reveal detection to bots
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! We've sent more information about CAMP 2025 to your email.",
          type: 'success',
        },
        { status: 200 }
      )
    }
    
    const firstName = fullName.split(' ')[0]

    // Create the email template with updated financial commitment section
    const emailTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CAMP 2025</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Content Table -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1e3a8a; padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; margin: 0; font-weight: 700;">Welcome to CAMP 2025</h1>
                            <h2 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px; margin-top: 10px; font-weight: 400;">A Journey of Transformation and Impact</h2>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="font-family: Arial, sans-serif; font-size: 18px; margin-top: 0;">Dear ${firstName},</p>

                            <p style="font-family: Arial, sans-serif; line-height: 1.6;">Thank you for expressing interest in CAMP 2025. I am thrilled that you're exploring this sacred space, designed to activate, educate, and empower you into the highest levels of prophetic purity and prevailing prayer.</p>

                            <!-- First CTA Button -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1e3a8a" style="border-radius: 8px;">
                                                    <a href="https://drjoshuatodd.com/camp-application" style="color: #ffffff; 
                                                              font-family: Arial, sans-serif;
                                                              font-size: 16px;
                                                              font-weight: bold;
                                                              text-decoration: none;
                                                              padding: 16px 32px;
                                                              display: inline-block;">
                                                        Apply Now for CAMP 2025
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Feature Box -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px; border-left: 4px solid #3b82f6;">
                                        <p style="font-family: Arial, sans-serif; margin: 0;">For the past 15 years, I've had the honor of training and raising up international prophetic leaders—true weapons for the Lord. These leaders have gone on to operate in various spheres of society, becoming both the voice and heart of God in the world.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-family: Arial, sans-serif; line-height: 1.6;">However, CAMP 2025 is unlike anything I've offered before. Through a season of dreams and confirmations from prophetic voices in my life, I felt the Lord leading me to create this opportunity for those He is calling to a deeper journey with Him.</p>

                            <p style="font-family: Arial, sans-serif; line-height: 1.6;">This is not a journey of comfort; it's a call to transformation. Together, we will press into knowing the Holy Spirit in new, profound ways and learn to impact others far beyond what you may currently imagine.</p>

                            <!-- What You Can Expect -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1e3a8a; font-family: Arial, sans-serif; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">What You Can Expect</h3>
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6;">CAMP 2025 is not about large numbers or accumulating attendees. Instead, it's about cultivating deep relationships and fostering significant growth. While I am new to offering an online learning experience, I am open to this being larger than my own comfort zone if it aligns with the Lord's plan.</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-family: Arial, sans-serif; line-height: 1.6;">You'll engage in a comprehensive journey, learning to honor the Lord in a new way while being equipped in:</p>
                            
                            <!-- Feature List -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0;">
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Intercession and prevailing prayer</td></tr>
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Dream interpretation</td></tr>
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Operating in the high courts of the Lord</td></tr>
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Accessing books of regions and people</td></tr>
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Working alongside apostolic leaders</td></tr>
                                <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• And much more</td></tr>
                            </table>

                            <!-- Second CTA Button -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1e3a8a" style="border-radius: 8px;">
                                                    <a href="https://drjoshuatodd.com/camp-application" style="color: #ffffff; 
                                                              font-family: Arial, sans-serif;
                                                              font-size: 16px;
                                                              font-weight: bold;
                                                              text-decoration: none;
                                                              padding: 16px 32px;
                                                              display: inline-block;">
                                                        Apply Now for CAMP 2025
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Financial Commitment -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #1e3a8a; font-family: Arial, sans-serif; font-size: 24px; margin-top: 0;">Financial Commitment</h3>
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">While I have never charged for CAMP mentorship, after prayerful consideration and wise counsel from leaders in my life, I am instituting a minimum monthly offering of $100 for each mentee who is part of CAMP. This shift comes in response to the tremendous fruit that came out of CAMP Part 1 and a deepened awareness of the value being stewarded in this space.</p>
                                        
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 15px;">This amount is double what was encouraged during CAMP 1, but still far below what many seasoned leaders have told me is appropriate for the depth of teaching, training, and tribe access you are receiving. Some have suggested $500 a month, even $1,000—but my heart remains to keep this accessible while also inviting everyone to invest meaningfully into what God is doing here.</p>
                                        
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 0;">My goal is still 100% participation. I am not asking for perfection, I am asking for partnership. This space is sacred, and I want each of us to be a shareholder in its impact. As you sow into this journey, know that your seed is transforming lives—including your own. I'm honored to walk this road with you. If you are unable to meet the $100 commitment, please reach out to our team and let us know in the event we can assist.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Exclusive Benefits -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <h3 style="color: #1e3a8a; font-family: Arial, sans-serif; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Exclusive Benefits</h3>
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6;">Your involvement and successful completion of assignments in CAMP 2025 will earn you transferable ministry studies credits into Kingdom Champion College, which is currently in the chartering phase. Upon its opening and your admission, these credits will apply toward bachelor's, master's, and doctoral degrees in Kingdom life and leadership.</p>
                                        
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6;">Additionally, you'll participate in:</p>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0;">
                                            <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• 1–2 live teachings from Dr Joshua each month, timed to accommodate different global regions</td></tr>
                                            <tr><td style="font-family: Arial, sans-serif; padding: 5px 0;">• Forging deep, meaningful relationships with fellow CAMP 2025 participants</td></tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- The Journey Ahead -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1e3a8a; font-family: Arial, sans-serif; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">The Journey Ahead</h3>
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6;">The application process is thorough, the commitments are real, and the journey is immensely rewarding. CAMP 2025 is not just an opportunity to grow—it's a call to step into a new level of prophetic living and Kingdom impact.</p>
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6;">I can't wait to see what God will do in and through you during this journey.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Third CTA Button -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1e3a8a" style="border-radius: 8px;">
                                                    <a href="https://drjoshuatodd.com/camp-application" style="color: #ffffff; 
                                                              font-family: Arial, sans-serif;
                                                              font-size: 16px;
                                                              font-weight: bold;
                                                              text-decoration: none;
                                                              padding: 16px 32px;
                                                              display: inline-block;">
                                                        Apply Now for CAMP 2025
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Signature -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px; border-top: 1px solid #e2e8f0;">
                                <tr>
                                    <td style="padding-top: 20px;">
                                        <p style="font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 5px;">In His Service,</p>
                                        <p style="font-family: Arial, sans-serif; font-weight: bold; margin-top: 0;">Dr Joshua Todd<br>Founder, CAMP 2025</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 20px;">
                                        <a href="http://www.drjoshuatodd.com" style="color: #3b82f6; 
                                                  font-family: Arial, sans-serif;
                                                  text-decoration: none;
                                                  font-weight: 500;">
                                            WWW.DrJoshuaTodd.com
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // All validations passed - store the interest in Sanity
    await adminClient.create({
      _type: 'campInterest',
      fullName,
      email,
      submittedAt: new Date().toISOString(),
      status: 'info_sent'
    })

    // Send email using Resend
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: [email],
      bcc: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'],
      subject: 'Welcome to CAMP 2025 - Your Journey of Transformation Awaits',
      html: emailTemplate
    })

    logger.info('CAMP interest form submitted successfully', {
      email,
      fullName,
      formFillTime,
    })

    return NextResponse.json({
      success: true,
      message: "Thank you! We've sent more information about CAMP 2025 to your email.",
      type: 'success'
    })
  } catch (error: any) {
    console.error('Error sending CAMP info email:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Something went wrong. Please try again later.',
        type: 'error'
      },
      { status: 500 }
    )
  }
}