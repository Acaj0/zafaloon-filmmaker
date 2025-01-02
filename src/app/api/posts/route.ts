import { NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    const newPost = await createPost(url)
    return NextResponse.json(newPost)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}