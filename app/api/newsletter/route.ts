import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Use existing Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER // assuming this is your existing env variable name
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

    // Make sure to use the correct list ID for newsletter subscribers
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_NEWSLETTER_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Handle existing subscribers gracefully
    if (error.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'You\'re already subscribed!' },
        { status: 400 }
      );
    }

    console.error('Mailchimp error:', error);
    return NextResponse.json(
      { error: 'There was an error subscribing to the newsletter.' },
      { status: 500 }
    );
  }
} 