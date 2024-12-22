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
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>State:</strong> ${data.state}</p>
        <p><strong>Zip Code:</strong> ${data.zipCode}</p>

        <h2>Emergency Contact</h2>
        <p><strong>Name:</strong> ${data.emergencyContactName}</p>
        <p><strong>Relationship:</strong> ${data.emergencyContactRelationship}</p>
        <p><strong>Phone:</strong> ${data.emergencyContactPhone}</p>

        <h2>Church Information</h2>
        <p><strong>Home Church:</strong> ${data.homeChurch}</p>
        <p><strong>Years Attending:</strong> ${data.yearsAttending}</p>
        <p><strong>Pastor's Name:</strong> ${data.pastorName}</p>
        <p><strong>Church Phone:</strong> ${data.churchPhone}</p>

        <h2>Additional Information</h2>
        <p><strong>Dietary Restrictions:</strong> ${data.dietaryRestrictions || 'None'}</p>
        <p><strong>Medical Conditions:</strong> ${data.medicalConditions || 'None'}</p>
        <p><strong>Medications:</strong> ${data.medications || 'None'}</p>
        <p><strong>Allergies:</strong> ${data.allergies || 'None'}</p>

        <h2>Experience & Expectations</h2>
        <p><strong>Ministry Experience:</strong> ${data.ministryExperience}</p>
        <p><strong>Why CAMP?:</strong> ${data.whyCAMP}</p>
        <p><strong>Expectations:</strong> ${data.expectations}</p>
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