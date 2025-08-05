import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from 'next-sanity'

const resend = new Resend(process.env.RESEND_API_KEY)

// Create admin client for reading/writing application data
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
    const { applicationId, amount } = await req.json()

    // Fetch application details
    const application = await adminClient.fetch(
      `*[_type == "campApplication" && _id == $id][0]`,
      { id: applicationId }
    )

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    // Create payment URL with the correct base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3333'
    const paymentUrl = `${baseUrl}/camp-payment?applicationId=${applicationId}&amount=${amount}`

    // Email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>CAMP 2025 Payment Link</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CAMP 2025 Payment</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Complete Your Registration</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hello ${application.fullName},</h2>
            
            <p>Congratulations! Your CAMP 2025 application has been <strong>approved</strong>.</p>
            
            <p>To complete your registration, please proceed with your monthly subscription payment of <strong>$${amount}</strong>.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${paymentUrl}" 
                 style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
                Complete Payment - $${amount}/month
              </a>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Payment Details:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Monthly Amount:</strong> $${amount}</li>
                <li><strong>Payment Type:</strong> Recurring Subscription</li>
                <li><strong>First Payment:</strong> Due upon completion</li>
                <li><strong>Billing Cycle:</strong> Monthly</li>
              </ul>
            </div>
            
            <p><strong>Important:</strong> Your spot in CAMP 2025 will be secured once your first payment is processed successfully.</p>
            
            <p>If you have any questions about the payment process, please don't hesitate to reach out.</p>
            
            <p>Blessings,<br>
            <strong>Dr. Joshua Todd</strong><br>
            CAMP 2025 Director</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              This payment link is personalized for your application. Please do not share this link with others.
            </p>
          </div>
        </body>
      </html>
    `

    // Send email
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: [application.email],
      bcc: ['drjoshuatodd@eastgatejax.com', 'nurbinabr@eastgatejax.com'],
      subject: `CAMP 2025 Payment Link - Complete Your Registration ($${amount}/month)`,
      html: emailTemplate
    })

    // Update application with payment link tracking
    const now = new Date().toISOString()
    const currentCount = application.paymentLinkSentCount || 0
    
    await adminClient
      .patch(applicationId)
      .set({ 
        paymentLinkSent: true,
        paymentLinkSentAt: now,
        paymentLinkSentCount: currentCount + 1
      })
      .setIfMissing({ communicationLog: [] })
      .append('communicationLog', [{
        _key: `payment-link-${Date.now()}`,
        date: now,
        type: 'payment_link_sent',
        subject: `Payment Link Sent - $${amount}/month`,
        content: `Payment link sent to ${application.email}. This is send #${currentCount + 1}.`
      }])
      .commit()

    return NextResponse.json({
      success: true,
      message: `Payment link sent successfully to ${application.email}`,
      sentCount: currentCount + 1
    })

  } catch (error: any) {
    console.error('Error sending payment link:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to send payment link' 
      },
      { status: 500 }
    )
  }
}