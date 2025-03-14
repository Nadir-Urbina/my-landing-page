import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json()
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const LIST_ID = process.env.MAILCHIMP_LIST_ID
    const DC = 'us15'

    console.log('Config check:', {
      hasApiKey: !!API_KEY,
      hasListId: !!LIST_ID,
      email: email
    })

    const response = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['CAMP Interest'],
          merge_fields: {
            FNAME: fullName.split(' ')[0],
            LNAME: fullName.split(' ').slice(1).join(' ')
          }
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (data.title === 'Member Exists') {
        return NextResponse.json({
          success: false,
          message: "You're already on our list! We'll keep you updated about CAMP.",
          type: 'info'
        })
      }

      console.error('Mailchimp API error:', data)
      throw new Error(data.detail || 'Failed to subscribe')
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll send more information to your email soon.",
      type: 'success'
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Something went wrong. Please try again later.',
        type: 'error'
      },
      { status: 500 }
    )
  }
} 