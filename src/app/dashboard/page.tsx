"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostUrl, setNewPostUrl] = useState("");

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
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Success",
        description: "Post updated successfully.",
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      await fetchPosts();
      toast({
        title: "Success",
        description: "Post deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newPostUrl }),
      });
      if (!response.ok) throw new Error("Failed to create post");
      await fetchPosts();
      setNewPostUrl("");
      toast({
        title: "Success",
        description: "New post created successfully.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create new post. Please try again.",
        variant: "destructive",
      });
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
    <div className="mt-5">
      <Footer />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Bem-vindo, {session?.user?.name || "User"} (ID:{" "}
              {session?.user?.id || "Unknown"})
            </p>
            <form onSubmit={handleCreatePost} className="mb-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={newPostUrl}
                  onChange={(e) => setNewPostUrl(e.target.value)}
                  placeholder="Enter new post URL"
                  className="flex-grow"
                />
                <Button type="submit">Create New Post</Button>
              </div>
            </form>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <li key={post.id} className="bg-white shadow-md rounded-lg p-4">
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
                      Delete
                    </Button>
                  </div>
                  <div className="flex justify-center">
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

