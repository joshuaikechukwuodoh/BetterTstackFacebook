/**
 * Core business logic for Posts
 * This separates database operations from API routes
 */
import { db } from "@backend/db";
import { posts } from "@backend/db/schema/posts";
import { eq } from "drizzle-orm";

// Types
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// Get all posts
export async function getAllPosts() {
  return await db.select().from(posts);
}

// Get post by ID
export async function getPostById(id: string) {
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0] ?? null;
}

// Create a new post
export async function createPost(data: NewPost) {
  return await db.insert(posts).values(data);
}

// Update a post
export async function updatePost(
  id: string,
  data: Partial<Pick<NewPost, "title" | "content">>
) {
  return await db.update(posts).set(data).where(eq(posts.id, id));
}

// Delete a post
export async function deletePost(id: string) {
  return await db.delete(posts).where(eq(posts.id, id));
}
