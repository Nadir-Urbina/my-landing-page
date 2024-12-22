import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    try {
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
      
      return NextResponse.json({ success: true })
    } catch (error: any) {
      // If member exists, just add the tag
      if (error.response?.body?.title === 'Member Exists') {
        const subscriberHash = mailchimp.helpers.lists.memberHash(data.email)
        await mailchimp.lists.updateListMemberTags(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            tags: [{ name: 'CAMP Interest', status: 'active' }]
          }
        )
        return NextResponse.json({ success: true })
      }
      throw error
    }
  } catch (error) {
    console.error('Error in CAMP application:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
} 