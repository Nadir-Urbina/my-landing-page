import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

export async function POST(req: Request) {
  try {
    console.log('Starting CAMP application request')
    
    // Log environment variables (safely)
    console.log('Environment check:', {
      hasApiKey: !!process.env.MAILCHIMP_API_KEY,
      hasListId: !!process.env.MAILCHIMP_LIST_ID,
      hasServerPrefix: !!process.env.MAILCHIMP_SERVER_PREFIX,
    })

    // Initialize Mailchimp with hardcoded server prefix for testing
    try {
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY || '',
        server: 'us15'  // Hardcode for testing
      })

      // Test the connection
      const data = await req.json()
      console.log('Received data:', { email: data.email, name: data.fullName })
      
      // Attempt to ping Mailchimp API
      console.log('Attempting to add member to Mailchimp')
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
        email_address: data.email,
        status: 'subscribed',
        tags: ['CAMP Interest'],
        merge_fields: {
          FNAME: data.fullName?.split(' ')[0] || '',
          LNAME: data.fullName?.split(' ').slice(1).join(' ') || '',
          SOURCE: 'CAMP Info Request'
        }
      })
      
      console.log('Successfully added member to Mailchimp', response)
      return NextResponse.json({ success: true })
    } catch (error: any) {
      console.log('Mailchimp error details:', {
        error: error,
        response: error.response?.body,
        stack: error.stack,
        status: error.status,
        title: error.title,
        detail: error.detail
      })
      
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

      // Return more detailed error information
      return NextResponse.json(
        { 
          error: 'Mailchimp operation failed',
          details: error.response?.body?.detail || error.message,
          title: error.response?.body?.title,
          status: error.status
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in CAMP application:', error)
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        details: error.message || 'Unknown error',
        stack: error.stack
      },
      { status: 500 }
    )
  }
} 