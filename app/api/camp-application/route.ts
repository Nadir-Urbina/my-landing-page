import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Send email notification
    await resend.emails.send({
      from: 'CAMP Applications <camp@eastgatejax.com>',
      to: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'],
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