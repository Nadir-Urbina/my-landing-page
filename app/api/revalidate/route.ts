import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity webhook payload types
interface SanityWebhookPayload {
  _type: string
  _id: string
  slug?: {
    current?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized using a secret token
    const authHeader = request.headers.get('authorization')
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!secret) {
      console.error('SANITY_REVALIDATE_SECRET is not configured')
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 500 }
      )
    }

    // Check if the authorization header matches our secret
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { error: 'Invalid authorization token' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const payload: SanityWebhookPayload = await request.json()
    const { _type, slug } = payload

    console.log(`Revalidation triggered for type: ${_type}`)

    // Determine which paths to revalidate based on content type
    const pathsToRevalidate: string[] = []

    switch (_type) {
      case 'event':
        // Revalidate homepage (shows upcoming events) and events page if it exists
        pathsToRevalidate.push('/')
        break

      case 'testimonial':
        // Revalidate homepage (shows testimonials)
        pathsToRevalidate.push('/')
        break

      case 'book':
        // Revalidate homepage (shows books)
        pathsToRevalidate.push('/')
        break

      case 'mission':
        // Revalidate homepage (shows missions)
        pathsToRevalidate.push('/')
        break

      case 'post':
        // Revalidate blog page and the specific post if slug exists
        pathsToRevalidate.push('/blog')
        pathsToRevalidate.push('/')
        if (slug?.current) {
          pathsToRevalidate.push(`/blog/${slug.current}`)
        }
        break

      case 'calendarEvent':
        // Revalidate calendar page
        pathsToRevalidate.push('/calendar')
        break

      case 'healingStreamsTestimonial':
      case 'healingStreamsEvent':
        // Revalidate healing streams page
        pathsToRevalidate.push('/healing-streams')
        break

      case 'course':
      case 'instructor':
      case 'interestForm':
        // Revalidate school of encounter page
        pathsToRevalidate.push('/school-of-encounter')
        break

      case 'ministry':
        // Revalidate homepage (shows ministry life) and the detail page if it has one
        pathsToRevalidate.push('/')
        if (slug?.current) {
          pathsToRevalidate.push(`/ministry/${slug.current}`)
        }
        break

      case 'campApplication':
      case 'campInterest':
        // Revalidate camp pages
        pathsToRevalidate.push('/camp')
        pathsToRevalidate.push('/camp-admin')
        break

      default:
        // For unknown types, revalidate homepage as fallback
        console.log(`Unknown content type: ${_type}, revalidating homepage`)
        pathsToRevalidate.push('/')
    }

    // Revalidate all the paths
    const revalidationResults = await Promise.allSettled(
      pathsToRevalidate.map(async (path) => {
        try {
          revalidatePath(path)
          console.log(`✓ Revalidated: ${path}`)
          return { path, success: true }
        } catch (error) {
          console.error(`✗ Failed to revalidate ${path}:`, error)
          return { path, success: false, error }
        }
      })
    )

    const successCount = revalidationResults.filter(
      (result) => result.status === 'fulfilled' && result.value.success
    ).length

    return NextResponse.json({
      revalidated: true,
      contentType: _type,
      paths: pathsToRevalidate,
      successCount,
      totalPaths: pathsToRevalidate.length,
      message: `Successfully revalidated ${successCount} of ${pathsToRevalidate.length} paths`,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      {
        error: 'Error revalidating',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Keep the old GET handler for manual testing/revalidation
export async function GET(request: NextRequest) {
  // Optional: Add same authorization check for GET
  const authHeader = request.headers.get('authorization')
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: 'Invalid authorization token' },
      { status: 401 }
    )
  }

  // Revalidate common paths
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/calendar')

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: 'Manual revalidation completed'
  })
} 