import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    
    // Check against the environment variable
    const adminPassword = process.env.CAMP_ADMIN_PWD
    
    if (!adminPassword) {
      console.error('CAMP_ADMIN_PWD environment variable not set')
      return NextResponse.json(
        { error: 'Admin authentication not configured' },
        { status: 500 }
      )
    }
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    } else {
      // Add a small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000))
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}