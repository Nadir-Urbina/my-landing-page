import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Create admin client that can see drafts
const adminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { id, type, status, notes } = await req.json()

    const updateData: any = { status }
    
    if (type === 'interest' && notes !== undefined) {
      updateData.notes = notes
    } else if (type === 'application' && notes !== undefined) {
      updateData.reviewNotes = notes
    }

    await adminClient.patch(id).set(updateData).commit()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}