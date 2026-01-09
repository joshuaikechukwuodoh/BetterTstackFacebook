/**
 * Core business logic for Comments
 * This separates database operations from API routes
 */
import { db } from "@backend/db";
import { comments } from "@backend/db/schema/comments";
import { eq } from "drizzle-orm";

// Types
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

// Get all comments
export async function getAllComments() {
  return await db.select().from(comments);
}

// Get comments by post ID
export async function getCommentsByPostId(postId: string) {
  return await db.select().from(comments).where(eq(comments.postId, postId));
}

// Get comment by ID
export async function getCommentById(id: string) {
  const result = await db.select().from(comments).where(eq(comments.id, id));
  return result[0] ?? null;
}

// Create a new comment
export async function createComment(data: NewComment) {
  return await db.insert(comments).values(data);
}

// Update a comment
export async function updateComment(id: string, content: string) {
  return await db.update(comments).set({ content }).where(eq(comments.id, id));
}

// Delete a comment
export async function deleteComment(id: string) {
  return await db.delete(comments).where(eq(comments.id, id));
}
