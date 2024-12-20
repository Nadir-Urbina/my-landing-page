import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const {
      fullName,
      email,
      phone,
      ministry,
      kingdomLeader,
      propheticTraining,
      salvationExperience,
      viewOfGod,
      hopesToLearn,
      howHeardAboutCamp,
      knowSomeoneInCamp,
      potentialCandidates
    } = data

    const emailContent = `
      <h1>New CAMP 2025 Application</h1>
      
      <h2>Personal Information</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      
      <h2>Current Ministry Involvement</h2>
      <p><strong>Ministry Connection:</strong> ${ministry}</p>
      <p><strong>Kingdom Leader:</strong> ${kingdomLeader}</p>
      <p><strong>Prophetic Training:</strong> ${propheticTraining}</p>
      
      <h2>Spiritual Background</h2>
      <p><strong>Salvation Experience:</strong> ${salvationExperience}</p>
      <p><strong>View of God:</strong> ${viewOfGod}</p>
      
      <h2>CAMP Specific Questions</h2>
      <p><strong>Hopes to Learn:</strong> ${hopesToLearn}</p>
      <p><strong>How they heard about CAMP:</strong> ${howHeardAboutCamp}</p>
      <p><strong>Knows someone in CAMP:</strong> ${knowSomeoneInCamp || 'No response'}</p>
      <p><strong>Potential Candidates:</strong> ${potentialCandidates || 'No response'}</p>
    `

    const { data: emailResponse } = await resend.emails.send({
      from: 'CAMP Applications <camp@eastgatejax.com>',
      to: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'], // Updated to correct email
      subject: `New CAMP 2025 Application - ${fullName}`,
      html: emailContent,
      replyTo: email
    })

    return NextResponse.json({ message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Error submitting application' },
      { status: 500 }
    )
  }
} 