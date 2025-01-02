import { NextResponse } from 'next/server'
import { reorderPosts } from '@/lib/posts'

export async function POST(request: Request) {
  try {
    const posts = await request.json()
    
    if (!Array.isArray(posts) || posts.some(post => !post.id || !post.url)) {
      return NextResponse.json({ error: 'Invalid post data' }, { status: 400 })
    }

    await reorderPosts(posts)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering posts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}