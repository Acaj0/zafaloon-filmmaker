import { Post } from "./posts";

// lib/mappers.ts
export function mapPostFromDatabase(post: any): Post {
    return {
      id: post.id,
      url: post.url,
      createdAt: post.createdat,
      updatedAt: post.updatedat,
    };
  }
  
  export function mapPostToDatabase(post: Partial<Post>): any {
    const { id, url, createdAt, updatedAt } = post;
    return {
      id,
      url,
      createdat: createdAt,
      updatedat: updatedAt,
    };
  }
  