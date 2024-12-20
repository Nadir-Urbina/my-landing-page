import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us15'
})

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    
    // Debug logging
    console.log('Received request:', { email, name })
    console.log('Mailchimp config:', {
      apiKey: process.env.MAILCHIMP_API_KEY?.slice(0, 5) + '...',
      server: process.env.MAILCHIMP_SERVER_PREFIX,
      listId: process.env.MAILCHIMP_LIST_ID,
    })

    if (!email || !name) {
      console.log('Missing email or name')
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Add member to list
    try {
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
        tags: ['CAMP Interest'],
      })
      console.log('Mailchimp success response:', response)
    } catch (mailchimpError: any) {
      console.error('Detailed Mailchimp error:', {
        status: mailchimpError.status,
        response: mailchimpError.response?.body,
        title: mailchimpError.response?.body?.title,
        detail: mailchimpError.response?.body?.detail,
      })
      throw mailchimpError
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to CAMP updates!' },
      { status: 200 }
    )
  } catch (error: any) {
    // Check if it's an existing subscriber
    if (error.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { message: 'You\'re already subscribed to our mailing list!' },
        { status: 200 }
      )
    }

    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: error.message || 'Error subscribing to the mailing list' },
      { status: 500 }
    )
  }
} 