/**
 * User Likes API Router
 * Uses core business logic from @backend/core
 */
import { z } from "zod";
import { router, publicProcedure } from "../index";

// Import from core package
import {
  getAllLikes,
  getLikesByPostId,
  getLikesByUserId,
  hasUserLikedPost,
  createLike,
  deleteLike,
  unlikePost,
} from "@backend/core";

export const userLikeRouter = router({
  // 🔹 Get all likes
  getAll: publicProcedure.query(async () => {
    return await getAllLikes();
  }),

  // 🔹 Get likes by post ID
  getByPostId: publicProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getLikesByPostId(input.postId);
    }),

  // 🔹 Get likes by user ID
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getLikesByUserId(input.userId);
    }),

  // 🔹 Check if user has liked a post
  hasLiked: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        postId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      return await hasUserLikedPost(input.userId, input.postId);
    }),

  // 🔹 Create a like
  createLike: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        postId: z.string().min(1),
        userId: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await createLike(input);
    }),

  // 🔹 Delete a like by ID
  deleteLike: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteLike(input.id);
    }),

  // 🔹 Unlike a post (by userId and postId)
  unlikePost: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        postId: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await unlikePost(input.userId, input.postId);
    }),
});
