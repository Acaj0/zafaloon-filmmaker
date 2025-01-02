import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/posts";

// Update to handle the context.params being a Promise
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // Expect params to be a Promise
) {
  try {
    // Await the params to get the resolved value
    const resolvedParams = await context.params;

    const { id } = resolvedParams; // Access id from the resolved params
    const post = await getPostById(id); // Use the id to fetch the post
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // Expect params to be a Promise
) {
  try {
    // Await the params to get the resolved value
    const resolvedParams = await context.params;

    const { id } = resolvedParams; // Extract id from the resolved params
    const updates = await request.json();
    const updatedPost = await updatePost(id, updates);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // Expect params to be a Promise
) {
  try {
    // Await the params to get the resolved value
    const resolvedParams = await context.params;

    const { id } = resolvedParams; // Extract id from the resolved params
    await deletePost(id); // Delete the post by id
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
