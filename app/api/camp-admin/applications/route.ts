import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Create admin client that can see drafts
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts', // This allows seeing draft documents
  token: process.env.SANITY_API_TOKEN,
})

export async function GET() {
  try {
    // Get applications with all fields, handling missing ones properly
    const applications = await adminClient.fetch(`
      *[_type == "campApplication"] | order(submittedAt desc)
    `, {}, { 
      // Force fresh data, no cache
      cache: 'no-store'
    })

    // Process applications to ensure all required fields exist with defaults
    const processedApplications = applications.map((app: any) => ({
      ...app,
      paymentStatus: app.paymentStatus || null,
      stripeCustomerId: app.stripeCustomerId || null,
      stripeSubscriptionId: app.stripeSubscriptionId || null,
      reviewNotes: app.reviewNotes || null,
      paymentLinkSent: app.paymentLinkSent || false,
      paymentLinkSentAt: app.paymentLinkSentAt || null,
      paymentLinkSentCount: app.paymentLinkSentCount || 0
    }))
    return NextResponse.json(processedApplications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}