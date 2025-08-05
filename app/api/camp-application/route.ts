import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Send thank you email to applicant
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: [data.email],
      subject: 'CAMP 2025 Application Received - Thank You!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>CAMP 2025 Application Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e3a8a; text-align: center;">Thank You for Your CAMP 2025 Application!</h1>
                
                <p>Dear ${data.fullName},</p>
                
                <p>Thank you for submitting your application for CAMP 2025. We have successfully received your application and are honored by your interest in this transformational journey.</p>
                
                <p>Dr. Joshua Todd will personally review your application and get back to you with the result soon. We appreciate your patience during this process as we prayerfully consider each applicant.</p>
                
                <p>In the meantime, please continue to prepare your heart for what God has in store. This journey is not just about learning—it's about transformation and stepping into the fullness of your prophetic calling.</p>
                
                <p style="margin-top: 30px;">In His Service,<br>
                <strong>The CAMP 2025 Team</strong></p>
                
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
      subject: `New CAMP 2025 Application - ${data.fullName}`,
      html: `
        <h1>New CAMP 2025 Application</h1>
        
        <h2>Personal Information</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>

        <h2>Current Ministry Involvement</h2>
        <p><strong>Current Ministry:</strong> ${data.ministry}</p>
        <p><strong>Kingdom Leader:</strong> ${data.kingdomLeader}</p>
        <p><strong>Prophetic Training & Involvement:</strong> ${data.propheticTraining}</p>

        <h2>Spiritual Background</h2>
        <p><strong>Salvation Experience:</strong> ${data.salvationExperience}</p>
        <p><strong>View of God:</strong> ${data.viewOfGod}</p>

        <h2>CAMP Specific Questions</h2>
        <p><strong>Hopes to Learn:</strong> ${data.hopesToLearn}</p>
        <p><strong>How They Heard About CAMP:</strong> ${data.howHeardAboutCamp}</p>
        <p><strong>Knows Someone in CAMP:</strong> ${data.knowSomeoneInCamp || 'No response'}</p>
        <p><strong>Potential Candidates:</strong> ${data.potentialCandidates || 'No response'}</p>
        
        <h2>Financial Commitment</h2>
        <p><strong>Financial Commitment Acknowledged:</strong> ${data.financialCommitmentAcknowledged ? 'Yes' : 'No'}</p>
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