import { NextResponse } from "next/server";
import { updatePost } from "@/lib/posts";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const updates = await request.json();
    
    if (!updates.url || typeof updates.url !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    await updatePost(id, updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Implement your logic to fetch the post by id
    // For example:
    // const post = await getPostById(id);
    
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

