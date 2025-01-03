import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

// Helper: Transforma os campos snake_case para camelCase
function mapPostFromDatabase(post: any): Post {
  return {
    id: post.id,
    url: post.url,
    createdAt: post.createdat,
    updatedAt: post.updatedat,
  };
}

// Helper: Transforma os campos camelCase para snake_case
function mapPostToDatabase(post: Partial<Post>): any {
  const { id, url, createdAt, updatedAt } = post;
  return {
    id,
    url,
    createdat: createdAt,
    updatedat: updatedAt,
  };
}

// Get all posts
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdat", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(mapPostFromDatabase);
}

// Get a single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.message !== "Row not found") {
    throw new Error(error.message);
  }

  return data ? mapPostFromDatabase(data) : null;
}

// Create a new post
export async function createPost(url: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ url }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapPostFromDatabase(data);
}

// Update an existing post
export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update(mapPostToDatabase(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapPostFromDatabase(data);
}

// Delete a post by ID
export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
