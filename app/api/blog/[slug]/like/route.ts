import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // Get current post
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        likeCount
      }
    `, { slug })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Increment like count
    const newLikeCount = (post.likeCount || 0) + 1

    // Update the post
    await client
      .patch(post._id)
      .set({ likeCount: newLikeCount })
      .commit()

    return NextResponse.json({ 
      success: true, 
      likeCount: newLikeCount 
    })
  } catch (error) {
    console.error('Error liking post:', error)
    return NextResponse.json(
      { error: 'Error liking post' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // Get current like count
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        likeCount
      }
    `, { slug })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      likeCount: post.likeCount || 0 
    })
  } catch (error) {
    console.error('Error getting like count:', error)
    return NextResponse.json(
      { error: 'Error getting like count' },
      { status: 500 }
    )
  }
} 