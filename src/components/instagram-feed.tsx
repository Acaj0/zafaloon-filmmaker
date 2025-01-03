'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface Post {
  id: string
  url: string
}

interface InstagramPostProps {
  url: string
}

function InstagramPost({ url }: InstagramPostProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
        }
      }
      document.body.appendChild(script)
    }
  }, [url])

  return (
    <Card>
      <CardContent className="p-0">
        <blockquote
          className="instagram-media w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
        />
      </CardContent>
    </Card>
  )
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/posts')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        console.log('Posts recebidos da API:', data)

        if (!Array.isArray(data)) {
          throw new Error('Received data is not an array')
        }

        setPosts(data)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Carregando...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">
        VEJA UM POUCO DO MEU TRABALHO
      </h2>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <InstagramPost key={post.id} url={post.url} />
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum post encontrado.</p>
      )}
    </section>
  )
}

