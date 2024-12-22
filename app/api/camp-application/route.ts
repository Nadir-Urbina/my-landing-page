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
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX?.substring(0, 2) + '**' // Log first 2 chars safely
    })

    if (!process.env.MAILCHIMP_API_KEY) {
      throw new Error('Missing MAILCHIMP_API_KEY')
    }
    if (!process.env.MAILCHIMP_LIST_ID) {
      throw new Error('Missing MAILCHIMP_LIST_ID')
    }
    if (!process.env.MAILCHIMP_SERVER_PREFIX) {
      throw new Error('Missing MAILCHIMP_SERVER_PREFIX')
    }

    // Initialize Mailchimp with explicit error handling
    try {
      const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX?.replace('https://', '')
        .replace('.api.mailchimp.com', '')
        .trim()

      console.log('Mailchimp config:', {
        hasApiKey: !!process.env.MAILCHIMP_API_KEY,
        serverPrefix: serverPrefix?.substring(0, 2) + '**'  // Log safely
      })

      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: serverPrefix // Use cleaned server prefix
      })
    } catch (error) {
      console.error('Failed to initialize Mailchimp:', error)
      throw new Error('Mailchimp initialization failed')
    }

    const data = await req.json()
    console.log('Received data:', { email: data.email, name: data.fullName })
    
    try {
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
        stack: error.stack
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
      throw error
    }
  } catch (error) {
    console.error('Error in CAMP application:', error)
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
} 