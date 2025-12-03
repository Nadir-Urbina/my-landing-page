import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from 'next-sanity'
import { verifyRecaptcha } from '@/lib/recaptcha'

const resend = new Resend(process.env.RESEND_API_KEY)

// Create admin client for writing applications
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
    const data = await req.json()

    // Verify reCAPTCHA token
    if (!data.recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      )
    }

    const isValid = await verifyRecaptcha(data.recaptchaToken)
    if (!isValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 403 }
      )
    }

    // Remove recaptchaToken from data before storing
    const { recaptchaToken, ...applicationData } = data

    // Store the application in Sanity
    await adminClient.create({
      _type: 'campApplication',
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    })

    // Check if this person previously requested info and update their status
    const existingInterest = await adminClient.fetch(
      `*[_type == "campInterest" && email == $email][0]`,
      { email: applicationData.email }
    )

    if (existingInterest) {
      await adminClient.patch(existingInterest._id).set({
        status: 'applied'
      }).commit()
    }

    // Send thank you email to applicant
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: [applicationData.email],
      subject: 'CAMP Season 3 Application Received - Thank You!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>CAMP Season 3 Application Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e3a8a; text-align: center;">Thank You for Your CAMP Season 3 Application!</h1>
                
                <p>Dear ${applicationData.fullName},</p>

                <p>Thank you for submitting your application for CAMP Season 3. We have successfully received your application and are honored by your interest in this transformational journey.</p>

                <p>Dr. Joshua Todd will personally review your application and get back to you with the result soon. We appreciate your patience during this process as we prayerfully consider each applicant.</p>

                <p>In the meantime, please continue to prepare your heart for what God has in store. This journey is not just about learning—it's about transformation and stepping into the fullness of your prophetic calling.</p>

                <p style="margin-top: 30px;">In His Service,<br>
                <strong>The CAMP Season 3 Team</strong></p>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <a href="https://drjoshuatodd.com" style="color: #1e3a8a; text-decoration: none;">www.drjoshuatodd.com</a>
                </div>
            </div>
        </body>
        </html>
      `
    })

    // Send admin notification email
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: ['drjoshuatodd@eastgatejax.com'],
      cc: ['nurbinabr@eastgatejax.com'],
      subject: `New CAMP Season 3 Application - ${applicationData.fullName}`,
      html: `
        <h1>New CAMP Season 3 Application</h1>

        <h2>Personal Information</h2>
        <p><strong>Full Name:</strong> ${applicationData.fullName}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> ${applicationData.phone}</p>

        <h2>Current Ministry Involvement</h2>
        <p><strong>Current Ministry:</strong> ${applicationData.ministry}</p>
        <p><strong>Kingdom Leader:</strong> ${applicationData.kingdomLeader}</p>
        <p><strong>Prophetic Training & Involvement:</strong> ${applicationData.propheticTraining}</p>

        <h2>Spiritual Background</h2>
        <p><strong>Salvation Experience:</strong> ${applicationData.salvationExperience}</p>
        <p><strong>View of God:</strong> ${applicationData.viewOfGod}</p>

        <h2>CAMP Specific Questions</h2>
        <p><strong>Hopes to Learn:</strong> ${applicationData.hopesToLearn}</p>
        <p><strong>How They Heard About CAMP:</strong> ${applicationData.howHeardAboutCamp}</p>
        <p><strong>Knows Someone in CAMP:</strong> ${applicationData.knowSomeoneInCamp || 'No response'}</p>
        <p><strong>Potential Candidates:</strong> ${applicationData.potentialCandidates || 'No response'}</p>

        <h2>Financial Commitment</h2>
        <p><strong>Financial Commitment Acknowledged:</strong> ${applicationData.financialCommitmentAcknowledged ? 'Yes' : 'No'}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
} 