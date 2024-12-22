import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
})

export async function POST(req: Request) {
  try {
    // Log the start of the request
    console.log('Starting CAMP application request')
    
    // Verify environment variables
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID || !process.env.MAILCHIMP_SERVER_PREFIX) {
      console.error('Missing environment variables:', {
        hasApiKey: !!process.env.MAILCHIMP_API_KEY,
        hasListId: !!process.env.MAILCHIMP_LIST_ID,
        hasServerPrefix: !!process.env.MAILCHIMP_SERVER_PREFIX
      })
      throw new Error('Missing required environment variables')
    }

    const data = await req.json()
    console.log('Received data:', { email: data.email, name: data.fullName })
    
    try {
      console.log('Attempting to add member to Mailchimp')
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
        email_address: data.email,
        status: 'subscribed',
        tags: ['CAMP Interest'],
        merge_fields: {
          FNAME: data.fullName?.split(' ')[0] || '',
          LNAME: data.fullName?.split(' ').slice(1).join(' ') || '',
          SOURCE: 'CAMP Info Request'
        }
      })
      
      console.log('Successfully added member to Mailchimp')
      return NextResponse.json({ success: true })
    } catch (error: any) {
      console.log('Mailchimp error:', error.response?.body || error)
      
      // If member exists, just add the tag
      if (error.response?.body?.title === 'Member Exists') {
        console.log('Member exists, updating tags')
        const subscriberHash = mailchimp.helpers.lists.memberHash(data.email)
        await mailchimp.lists.updateListMemberTags(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            tags: [{ name: 'CAMP Interest', status: 'active' }]
          }
        )
        console.log('Successfully updated member tags')
        return NextResponse.json({ success: true })
      }
      throw error
    }
  } catch (error) {
    console.error('Error in CAMP application:', error)
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 