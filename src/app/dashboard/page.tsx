'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from '@/hooks/use-toast'

interface Post {
  id: string
  url: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchPosts()
    }
  }, [status, router])

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(posts)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPosts(items)

    try {
      const response = await fetch('/api/posts/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      if (!response.ok) throw new Error('Failed to reorder posts')
    } catch (error) {
      console.error('Error reordering posts:', error)
      toast({
        title: "Error",
        description: "Failed to reorder posts. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePost = async (id: string, newUrl: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl }),
      })
      if (!response.ok) throw new Error('Failed to update post')
      await fetchPosts()
      toast({
        title: "Success",
        description: "Post updated successfully.",
      })
    } catch (error) {
      console.error('Error updating post:', error)
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (status === 'loading' || isLoading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return null // or redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Bem-vindo, {session.user.name} (ID: {session.user.id})</p>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="posts">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {posts.map((post, index) => (
                    <Draggable key={post.id} draggableId={post.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white shadow-md rounded-lg p-4"
                        >
                          <div className="flex items-center space-x-2">
                            <Input
                              type="text"
                              value={post.url}
                              onChange={(e) => handleUpdatePost(post.id, e.target.value)}
                              className="flex-grow"
                            />
                            <Button variant="outline" size="sm" onClick={() => handleUpdatePost(post.id, post.url)}>
                              Salvar
                            </Button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  )
}

