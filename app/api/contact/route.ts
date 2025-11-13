import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/lib/recaptcha'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptchaToken } = await req.json()

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      )
    }

    const isValid = await verifyRecaptcha(recaptchaToken)
    if (!isValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 403 }
      )
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'],
      subject: 'New Contact Form Submission from DjT page',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    )
  }
} 