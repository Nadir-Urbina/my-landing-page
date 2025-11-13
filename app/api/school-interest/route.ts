import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { client } from '@/lib/sanity.client'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const { email, name, phone = '', recaptchaToken } = await req.json()

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA token is required', type: 'error' },
        { status: 400 }
      )
    }

    const isValid = await verifyRecaptcha(recaptchaToken)
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification failed. Please try again.', type: 'error' },
        { status: 403 }
      )
    }
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const LIST_ID = process.env.MAILCHIMP_LIST_ID
    const DC = process.env.MAILCHIMP_SERVER_PREFIX || 'us15'

    logger.log('Form submission received:', { name, email, phone })
    logger.log('Mailchimp config:', {
      hasApiKey: !!API_KEY,
      apiKeyLength: API_KEY?.length,
      hasListId: !!LIST_ID,
      listId: LIST_ID,
      dataCenterPrefix: DC
    })

    if (!email || !email.length) {
      logger.log('Validation error: Email is required')
      return NextResponse.json(
        { success: false, message: 'Email is required', type: 'error' },
        { status: 400 }
      )
    }

    // Generate MD5 hash of lowercase email (required by Mailchimp for member identification)
    const subscriberHash = createHash('md5').update(email.toLowerCase()).digest('hex')

    const requestBody = {
      email_address: email,
      status: 'subscribed',
      tags: ['School of Encounter Interest'],
      merge_fields: {
        FNAME: name.split(' ')[0],
        LNAME: name.split(' ').slice(1).join(' '),
        PHONE: phone || ''
      }
    }

    logger.log('Preparing Mailchimp request to:', `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`)
    logger.log('Request body:', JSON.stringify(requestBody))

    // Store the submission in Sanity CMS
    try {
      const sanityData = {
        _type: 'interestForm',
        name,
        email,
        phone: phone || undefined,
        interests: ['schoolOfEncounter'],
        submittedAt: new Date().toISOString(),
        mailchimpStatus: 'pending'
      }
      
      const sanityResult = await client.create(sanityData)
      logger.log('Created Sanity record:', sanityResult._id)
    } catch (sanityError) {
      logger.error('Error storing submission in Sanity:', sanityError)
      // Continue with Mailchimp integration even if Sanity fails
    }

    const response = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    const data = await response.json()
    logger.log('Mailchimp API response status:', response.status)
    logger.log('Mailchimp API response:', data)

    // Update Sanity record with Mailchimp status
    try {
      const sanityRecord = await client.fetch(
        `*[_type == "interestForm" && email == $email] | order(submittedAt desc)[0]._id`,
        { email }
      )
      
      if (sanityRecord) {
        if (response.ok) {
          await client.patch(sanityRecord)
            .set({ mailchimpStatus: 'subscribed' })
            .commit()
        } else {
          await client.patch(sanityRecord)
            .set({ 
              mailchimpStatus: 'failed',
              statusNotes: data.detail || data.title || JSON.stringify(data)
            })
            .commit()
        }
      }
    } catch (updateError) {
      logger.error('Error updating Sanity record:', updateError)
    }

    if (!response.ok) {
      if (data.title === 'Member Exists') {
        logger.log('Member already exists in Mailchimp - adding new tag')
        
        // Add the School of Encounter Interest tag to the existing member
        try {
          const tagUpdateResponse = await fetch(
            `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}/tags`,
            {
              method: 'POST',
              headers: {
                Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tags: [{ name: 'School of Encounter Interest', status: 'active' }]
              }),
            }
          )

          if (tagUpdateResponse.ok) {
            logger.log('Successfully added School of Encounter tag to existing member')
            
            // Also update their merge fields with any new info provided
            const mergeFieldsResponse = await fetch(
              `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  merge_fields: requestBody.merge_fields
                }),
              }
            )

            logger.log('Merge fields update response:', await mergeFieldsResponse.json())
            
            // Update Sanity record status
            try {
              const sanityRecord = await client.fetch(
                `*[_type == "interestForm" && email == $email] | order(submittedAt desc)[0]._id`,
                { email }
              )
              
              if (sanityRecord) {
                await client.patch(sanityRecord)
                  .set({ mailchimpStatus: 'subscribed', statusNotes: 'Member already existed. Tag and merge fields updated.' })
                  .commit()
              }
            } catch (updateError) {
              logger.error('Error updating Sanity record:', updateError)
            }
            
            return NextResponse.json({
              success: true,
              message: "Thank you for your interest in the School of Encounter! We'll send you more information soon.",
              type: 'success'
            })
          } else {
            logger.error('Failed to add tag:', await tagUpdateResponse.json())
            return NextResponse.json({
              success: false,
              message: "We couldn't update your preferences. Please try again later.",
              type: 'error'
            }, { status: 400 })
          }
        } catch (tagError) {
          logger.error('Error updating member tags:', tagError)
          return NextResponse.json({
            success: false,
            message: "We couldn't update your preferences. Please try again later.",
            type: 'error'
          }, { status: 500 })
        }
      }
      
      // Handle GDPR/forgotten email case
      if (data.title === 'Forgotten Email Not Subscribed') {
        logger.log('Email was previously deleted and cannot be re-added via API')
        
        // Update Sanity record
        try {
          const sanityRecord = await client.fetch(
            `*[_type == "interestForm" && email == $email] | order(submittedAt desc)[0]._id`,
            { email }
          )
          
          if (sanityRecord) {
            await client.patch(sanityRecord)
              .set({ 
                mailchimpStatus: 'failed', 
                statusNotes: 'Email was previously deleted and cannot be re-added via API due to GDPR compliance' 
              })
              .commit()
          }
        } catch (updateError) {
          logger.error('Error updating Sanity record:', updateError)
        }
        
        return NextResponse.json({
          success: false,
          message: "This email address has previously been removed from our list. Please use a different email or contact us directly for assistance.",
          type: 'info'
        })
      }

      logger.error('Mailchimp API error:', data)
      return NextResponse.json({ 
        success: false, 
        message: data.detail || 'There was an issue with your subscription. Please try again or contact us directly.',
        type: 'error'
      }, { status: 400 })
    }

    logger.log('Successfully subscribed to Mailchimp')
    return NextResponse.json({
      success: true,
      message: "Thank you for your interest! We'll send more information about the School of Encounter to your email soon.",
      type: 'success'
    })
  } catch (error: any) {
    logger.error('Exception caught:', error)
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