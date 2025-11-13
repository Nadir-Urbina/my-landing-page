import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const resend = new Resend(process.env.RESEND_API_KEY)

// Create admin client for updating application status
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    logger.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        logger.log('Checkout session completed:', session.id)
        
        // Update application status to 'payment_completed'
        if (session.metadata?.applicationId) {
          // Get application details for email
          const application = await adminClient.fetch(
            `*[_type == "campApplication" && _id == $id][0]`,
            { id: session.metadata.applicationId }
          )
          
          await adminClient.patch(session.metadata.applicationId).set({
            status: 'accepted',
            paymentStatus: 'active',
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            reviewNotes: 'Payment completed - subscription active'
          }).commit()
          
          // Send payment confirmation email
          if (application && session.metadata?.customerEmail) {
            await resend.emails.send({
              from: 'noreply@drjoshuatodd.com',
              to: [session.metadata.customerEmail],
              subject: 'CAMP 2025 Payment Confirmed - Welcome!',
              html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>CAMP 2025 Payment Confirmed</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #1e3a8a; text-align: center;">🎉 Welcome to CAMP 2025!</h1>
                        
                        <p>Dear ${application.fullName},</p>
                        
                        <p>Congratulations! Your payment has been successfully processed and your CAMP 2025 subscription is now <strong>active</strong>.</p>
                        
                        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3a8a;">
                            <h3 style="color: #1e3a8a; margin-top: 0;">Payment Confirmation</h3>
                            <p style="margin-bottom: 5px;"><strong>Subscription:</strong> CAMP 2025 Monthly Mentorship</p>
                            <p style="margin-bottom: 5px;"><strong>Status:</strong> Active</p>
                            <p style="margin-bottom: 0;"><strong>Next Billing:</strong> Monthly on this date</p>
                        </div>
                        
                        <h3 style="color: #1e3a8a;">What Happens Next:</h3>
                        <ol style="padding-left: 20px;">
                            <li style="margin-bottom: 10px;"><strong>Welcome Package:</strong> You'll receive detailed information about accessing CAMP materials and sessions</li>
                            <li style="margin-bottom: 10px;"><strong>Personal Contact:</strong> Dr. Joshua will personally reach out with your schedule and access details</li>
                            <li style="margin-bottom: 10px;"><strong>Community Access:</strong> You'll be invited to the exclusive CAMP member community</li>
                            <li style="margin-bottom: 10px;"><strong>First Session:</strong> Details about your first mentorship session will be provided soon</li>
                        </ol>
                        
                        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <h4 style="color: #92400e; margin-top: 0;">Important Reminders:</h4>
                            <ul style="margin-bottom: 0; padding-left: 20px;">
                                <li style="color: #92400e; font-size: 14px;">Your subscription will automatically renew monthly</li>
                                <li style="color: #92400e; font-size: 14px;">You can manage your subscription anytime</li>
                                <li style="color: #92400e; font-size: 14px;">All session recordings and materials will be made available to you</li>
                            </ul>
                        </div>
                        
                        <p>This is the beginning of an incredible journey of prophetic development and spiritual growth. I'm honored to walk this path with you.</p>
                        
                        <p style="margin-top: 30px;">In His Service,<br>
                        <strong>Dr. Joshua Todd</strong><br>
                        Founder, CAMP 2025</p>
                        
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        
                        <p style="font-size: 12px; color: #666; text-align: center;">
                            Questions? Contact us at <a href="mailto:drjoshuatodd@eastgatejax.com">drjoshuatodd@eastgatejax.com</a><br>
                            Manage your subscription: <a href="https://billing.stripe.com/p/login/test_XXX">Customer Portal</a>
                        </p>
                        
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="https://drjoshuatodd.com" style="color: #1e3a8a; text-decoration: none;">www.drjoshuatodd.com</a>
                        </div>
                    </div>
                </body>
                </html>
              `
            })
          }

          logger.log('Updated application status for:', session.metadata.applicationId)
        }
        break

      case 'customer.subscription.created':
        const createdSubscription = event.data.object as Stripe.Subscription
        logger.log('Subscription created:', createdSubscription.id)
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription
        logger.log('Subscription updated:', updatedSubscription.id)
        
        // Update payment status based on subscription status
        if (updatedSubscription.metadata?.applicationId) {
          let paymentStatus = 'active'
          if (updatedSubscription.status === 'past_due') {
            paymentStatus = 'past_due'
          } else if (updatedSubscription.status === 'canceled') {
            paymentStatus = 'cancelled'
          } else if (updatedSubscription.status === 'incomplete') {
            paymentStatus = 'incomplete'
          }
          
          await adminClient.patch(updatedSubscription.metadata.applicationId).set({
            paymentStatus: paymentStatus
          }).commit()
        }
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        logger.log('Subscription cancelled:', deletedSubscription.id)
        
        // Update application status when subscription is cancelled
        if (deletedSubscription.metadata?.applicationId) {
          await adminClient.patch(deletedSubscription.metadata.applicationId).set({
            paymentStatus: 'cancelled',
            reviewNotes: 'Subscription cancelled'
          }).commit()
        }
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        logger.log('Payment failed for invoice:', failedInvoice.id)
        
        // You might want to send an email notification here
        break

      default:
        logger.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}