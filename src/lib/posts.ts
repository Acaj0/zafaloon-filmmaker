import fs from 'fs/promises'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const postsFile = path.join(dataDir, 'posts.json')

export interface Post {
  id: string
  url: string
  createdAt: string
  updatedAt: string
}

async function ensureFileExists() {
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
  }

  try {
    await fs.access(postsFile)
  } catch (error) {
    await fs.writeFile(postsFile, '[]')
  }
}

export async function getPosts(): Promise<Post[]> {
  await ensureFileExists()
  const data = await fs.readFile(postsFile, 'utf8')
  return JSON.parse(data)
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find(post => post.id === id) || null
}

export async function createPost(url: string): Promise<Post> {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL')
  }
  const posts = await getPosts()
  const newPost: Post = {
    id: Date.now().toString(),
    url,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  posts.push(newPost)
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
  return newPost
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  if (!id || (updates.url && typeof updates.url !== 'string')) {
    throw new Error('Invalid update data')
  }
  const posts = await getPosts()
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) {
    throw new Error('Post not found')
  }
  posts[index] = { 
    ...posts[index], 
    ...updates, 
    updatedAt: new Date().toISOString() 
  }
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2))
  return posts[index]
}

export async function deletePost(id: string): Promise<void> {
  const posts = await getPosts()
  const updatedPosts = posts.filter(post => post.id !== id)
  if (posts.length === updatedPosts.length) {
    throw new Error('Post not found')
  }
  await fs.writeFile(postsFile, JSON.stringify(updatedPosts, null, 2))
}

export async function reorderPosts(newOrder: string[]): Promise<Post[]> {
  const posts = await getPosts()
  if (newOrder.length !== posts.length || !newOrder.every(id => posts.some(post => post.id === id))) {
    throw new Error('Invalid reorder data')
  }
  const reorderedPosts = newOrder.map(id => posts.find(post => post.id === id)!)
  await fs.writeFile(postsFile, JSON.stringify(reorderedPosts, null, 2))
  return reorderedPosts
}