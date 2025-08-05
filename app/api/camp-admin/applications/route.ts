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
    // Get applications with detailed fields - using coalesce for optional fields
    const applications = await adminClient.fetch(`
      *[_type == "campApplication"] | order(submittedAt desc) {
        _id,
        fullName,
        email,
        phone,
        ministry,
        kingdomLeader,
        propheticTraining,
        salvationExperience,
        viewOfGod,
        hopesToLearn,
        howHeardAboutCamp,
        knowSomeoneInCamp,
        potentialCandidates,
        financialCommitmentAcknowledged,
        submittedAt,
        status,
        "paymentStatus": coalesce(paymentStatus, null),
        "stripeCustomerId": coalesce(stripeCustomerId, null),
        "stripeSubscriptionId": coalesce(stripeSubscriptionId, null),
        "reviewNotes": coalesce(reviewNotes, null),
        "paymentLinkSent": coalesce(paymentLinkSent, false),
        "paymentLinkSentAt": coalesce(paymentLinkSentAt, null),
        "paymentLinkSentCount": coalesce(paymentLinkSentCount, 0)
      }
    `)

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}