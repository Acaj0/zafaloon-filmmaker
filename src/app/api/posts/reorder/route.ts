import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const posts = await request.json()
    
    if (!Array.isArray(posts) || posts.some(post => !post.id || !post.url)) {
      return NextResponse.json({ error: 'Invalid post data' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering posts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

