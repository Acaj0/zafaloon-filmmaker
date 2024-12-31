import fs from 'fs/promises'
import path from 'path'

const postsFile = path.join(process.cwd(), 'data', 'posts.json')

export async function getPosts() {
  const data = await fs.readFile(postsFile, 'utf8')
  return JSON.parse(data)
}

export async function reorderPosts(posts: any[]) {
  if (!Array.isArray(posts) || posts.some(post => !post.id || !post.url)) {
    throw new Error('Invalid post data')
  }
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
}

export async function updatePost(id: string, updates: { url: string }) {
  if (!id || !updates.url || typeof updates.url !== 'string') {
    throw new Error('Invalid update data')
  }
  const posts = await getPosts()
  const index = posts.findIndex((post: any) => post.id === id)
  if (index === -1) {
    throw new Error('Post not found')
  }
  posts[index] = { ...posts[index], ...updates }
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
}

