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
    // Verificar se window.instgrm está disponível
    if (typeof window !== 'undefined' && window.instgrm) {
      // Se a instgrm estiver disponível, processamos os embeds
      window.instgrm.Embeds.process()
    } else {
      // Se não estiver disponível, carregamos o script
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        // Chama o processamento de embed depois que o script for carregado
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

        // Verifica se o status da resposta é ok
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const data = await response.json()

        // Log para ver o que está sendo retornado da API
        console.log('Posts recebidos da API:', data)

        // Verifica se os dados são um array válido
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

  // Verificando se está carregando
  if (isLoading) {
    return <div>Carregando...</div>
  }

  // Exibe a mensagem de erro, se houver
  if (error) {
    return <div>Error: {error}</div>
  }

  // Renderiza os posts
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
