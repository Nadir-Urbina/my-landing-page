import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  // Store request data and email content at the top level
  const data = await req.json();
  const emailContent = `
    <h1>New CAMP 2025 Application</h1>
    
    <h2>Personal Information</h2>
    <p><strong>Full Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    
    <h2>Current Ministry Involvement</h2>
    <p><strong>Ministry Connection:</strong> ${data.ministry}</p>
    <p><strong>Kingdom Leader:</strong> ${data.kingdomLeader}</p>
    <p><strong>Prophetic Training:</strong> ${data.propheticTraining}</p>
    
    <h2>Spiritual Background</h2>
    <p><strong>Salvation Experience:</strong> ${data.salvationExperience}</p>
    <p><strong>View of God:</strong> ${data.viewOfGod}</p>
    
    <h2>CAMP Specific Questions</h2>
    <p><strong>Hopes to Learn:</strong> ${data.hopesToLearn}</p>
    <p><strong>How they heard about CAMP:</strong> ${data.howHeardAboutCamp}</p>
    <p><strong>Knows someone in CAMP:</strong> ${data.knowSomeoneInCamp || 'No response'}</p>
    <p><strong>Potential Candidates:</strong> ${data.potentialCandidates || 'No response'}</p>
  `;

  try {
    // First Mailchimp attempt
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: data.email,
      status: 'subscribed',
      tags: ['CAMP Interest'],
      merge_fields: {
        FNAME: data.fullName.split(' ')[0],
        LNAME: data.fullName.split(' ').slice(1).join(' '),
        PHONE: data.phone,
        SOURCE: 'CAMP Application'
      }
    });

    // Send email
    const { data: emailResponse } = await resend.emails.send({
      from: 'CAMP Applications <camp@eastgatejax.com>',
      to: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'],
      subject: `New CAMP 2025 Application - ${data.fullName}`,
      html: emailContent,
      replyTo: data.email
    });

    return NextResponse.json({ message: 'Application submitted successfully' });
  } catch (error: any) {
    if (error.response?.body?.title === 'Member Exists') {
      try {
        const subscriberHash = mailchimp.helpers.lists.memberHash(data.email);
        // Update tags and send email using the stored data and emailContent
        await mailchimp.lists.updateListMemberTags(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            tags: [{ name: 'CAMP Interest', status: 'active' }]
          }
        );

        // Send email in a new try block
        try {
          const emailResponse = await resend.emails.send({
            from: 'CAMP Applications <camp@eastgatejax.com>',
            to: ['nurbinabr@eastgatejax.com', 'drjoshuatodd@eastgatejax.com'],
            subject: `New CAMP 2025 Application - ${data.fullName}`,
            html: emailContent,
            replyTo: data.email
          });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }

        return NextResponse.json({ success: true });
      } catch (tagError) {
        console.error('Error updating member tags:', tagError);
      }
    }

    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error submitting application' },
      { status: 500 }
    )
  }
} 