/**
 * Core business logic for Likes
 * This separates database operations from API routes
 */
import { db } from "@backend/db";
import { likes } from "@backend/db/schema/likes";
import { eq, and } from "drizzle-orm";

// Types
export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;

// Get all likes
export async function getAllLikes() {
  return await db.select().from(likes);
}

// Get likes by post ID
export async function getLikesByPostId(postId: string) {
  return await db.select().from(likes).where(eq(likes.postId, postId));
}

// Get likes by user ID
export async function getLikesByUserId(userId: string) {
  return await db.select().from(likes).where(eq(likes.userId, userId));
}

// Check if user has liked a post
export async function hasUserLikedPost(userId: string, postId: string) {
  const result = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
  return result.length > 0;
}

// Create a like
export async function createLike(data: NewLike) {
  return await db.insert(likes).values(data);
}

// Delete a like by ID
export async function deleteLike(id: string) {
  return await db.delete(likes).where(eq(likes.id, id));
}

// Unlike a post (delete by userId and postId)
export async function unlikePost(userId: string, postId: string) {
  return await db
    .delete(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
}
