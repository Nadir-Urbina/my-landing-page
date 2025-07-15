import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import type { Comment } from '@/types/sanity'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const { author, email, content } = await request.json()

    // Validate required fields
    if (!author || !email || !content) {
      return NextResponse.json(
        { error: 'Author, email, and content are required' },
        { status: 400 }
      )
    }

    // Get the post ID from the slug
    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id
      }
    `, { slug })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Create the comment (will be pending approval)
    const comment = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: post._id
      },
      author,
      email,
      content,
      isApproved: false,
      submittedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully and is pending approval',
      commentId: comment._id
    })
  } catch (error) {
    console.error('Error submitting comment:', error)
    return NextResponse.json(
      { error: 'Error submitting comment' },
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

    // Get approved comments for this post
    const comments = await client.fetch(`
      *[_type == "comment" && post->slug.current == $slug && isApproved == true] | order(submittedAt asc) {
        _id,
        author,
        content,
        submittedAt,
        approvedAt
      }
    `, { slug })

    return NextResponse.json({
      success: true,
      comments: comments || []
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Error fetching comments' },
      { status: 500 }
    )
  }
} 