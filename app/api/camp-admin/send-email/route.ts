import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from 'next-sanity'

const resend = new Resend(process.env.RESEND_API_KEY)

// Create admin client that can see drafts
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
    const { to, subject, content, recordId, recordType } = await req.json()

    // Send email using Resend
    await resend.emails.send({
      from: 'noreply@drjoshuatodd.com',
      to: [to],
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                ${content.replace(/\n/g, '<br>')}
            </div>
        </body>
        </html>
      `
    })

    // Log the communication in Sanity
    const communicationEntry = {
      _key: `email-${Date.now()}`,
      date: new Date().toISOString(),
      type: 'email_sent',
      subject,
      content
    }

    if (recordType === 'application') {
      // Add to communication log for applications
      const application = await adminClient.fetch(
        `*[_type == "campApplication" && _id == $id][0]`,
        { id: recordId }
      )
      
      const existingLog = application?.communicationLog || []
      await adminClient.patch(recordId).set({
        communicationLog: [...existingLog, communicationEntry]
      }).commit()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}