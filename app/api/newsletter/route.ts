import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp with config
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.length) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Add member to list with newsletter tag
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
      tags: ['newsletter'],
      merge_fields: {
        SOURCE: 'Website Newsletter'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Log the actual error for debugging
    console.error('Detailed error:', error);

    if (error.response?.body?.title === 'Member Exists') {
      try {
        const subscriberHash = mailchimp.helpers.lists.memberHash(email);
        await mailchimp.lists.updateListMemberTags(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            tags: [{ name: 'newsletter', status: 'active' }]
          }
        );
        return NextResponse.json({ success: true });
      } catch (tagError) {
        console.error('Error updating member tags:', tagError);
        return NextResponse.json(
          { error: 'Error updating subscription.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'There was an error subscribing to the newsletter.' },
      { status: 500 }
    );
  }
} 