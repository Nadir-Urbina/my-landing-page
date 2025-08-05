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
    const interests = await adminClient.fetch(`
      *[_type == "campInterest"] | order(submittedAt desc) {
        _id,
        fullName,
        email,
        submittedAt,
        status,
        notes
      }
    `, {}, { 
      // Force fresh data, no cache
      cache: 'no-store'
    })

    return NextResponse.json(interests)
  } catch (error) {
    console.error('Error fetching interests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interests' },
      { status: 500 }
    )
  }
}