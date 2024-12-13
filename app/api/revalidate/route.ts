import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  revalidatePath('/blog')
  revalidatePath('/calendar')
  return NextResponse.json({ revalidated: true, now: Date.now() })
} 