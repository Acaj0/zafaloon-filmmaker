"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import Alert from "@/components/Alert";

interface Post {
  id: string;
  url: string;
}

function InstagramPost({ url }: { url: string }) {
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
          style={{ maxWidth: '300px', minWidth: '200px' }}
        />
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostUrl, setNewPostUrl] = useState("");
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAlert({ message: "Failed to fetch posts. Please try again.", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async (id: string, newUrl: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl }),
      });
      if (!response.ok) throw new Error("Failed to update post");
      await fetchPosts();
      setAlert({ message: "Post updated successfully.", type: 'success' });
    } catch (error) {
      console.error("Error updating post:", error);
      setAlert({ message: "Failed to update post. Please try again.", type: 'error' });
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      await fetchPosts();
      setAlert({ message: "Post Apagado.", type: 'success' });
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlert({ message: "Erro ao apagar post, tente novamente.", type: 'error' });
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostUrl.trim()) {
      setAlert({ message: "Link Invalido.", type: 'error' });
      return;
    }
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newPostUrl }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      await fetchPosts();
      setNewPostUrl("");
      setAlert({ message: "Novo post criado!", type: 'success' });
    } catch (error) {
      console.error("Error creating post:", error);
      setAlert({ message: "Erro ao criar post, tente novamente.", type: 'error' });
    }
  };

  if (status === "loading" || isLoading) {
    return <div>Carregando...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="bg-gray-100 py-5">
      <Footer />
      <div className="container mx-auto max-w-[1000px] px-4 ">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <Card>
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <p className="mb-4">
              Bem-vindo, Zafa Lindo!
            </p>
            <form onSubmit={handleCreatePost} className="mb-10">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={newPostUrl}
                  onChange={(e) => setNewPostUrl(e.target.value)}
                  placeholder="Link do Instagram"
                  className="flex-grow"
                />
                <Button type="submit"><svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg></Button>
              </div>
            </form>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <li key={post.id} className="bg-white rounded-lg items-center p-4 max-w-96">
                  <div className="flex items-center space-x-2 mb-4">
                    <Input
                      type="text"
                      value={post.url}
                      onChange={(e) => handleUpdatePost(post.id, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <InstagramPost url={post.url} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

