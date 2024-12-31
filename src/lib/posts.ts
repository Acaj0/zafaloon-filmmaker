import fs from 'fs/promises'
import path from 'path'

const postsFile = path.join(process.cwd(), 'data', 'posts.json')

interface Post {
  id: string
  url: string
  // Add other post properties here if needed
}

export async function getPosts(): Promise<Post[]> {
  const data = await fs.readFile(postsFile, 'utf8')
  return JSON.parse(data)
}

export async function reorderPosts(posts: Post[]): Promise<void> {
  if (!Array.isArray(posts) || posts.some(post => !post.id || !post.url)) {
    throw new Error('Invalid post data')
  }
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<void> {
  if (!id || !updates.url || typeof updates.url !== 'string') {
    throw new Error('Invalid update data')
  }
  const posts = await getPosts()
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) {
    throw new Error('Post not found')
  }
  posts[index] = { ...posts[index], ...updates }
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
}

