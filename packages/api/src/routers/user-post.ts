/**
 * User Posts API Router
 * Uses core business logic from @backend/core
 */
import { z } from "zod";
import { router, publicProcedure } from "../index";

// Import from core package - use either method:
// Method 1: Import individual functions
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "@backend/core";

// Method 2: Import as namespace (commented out, but available)
// import { PostService } from "@backend/core";
// Then use: PostService.getAllPosts()

export const userPostRouter = router({
  // Get all posts
  getAll: publicProcedure.query(async () => {
    return await getAllPosts();
  }),

  // Get single post by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getPostById(input.id);
    }),

  // Create post
  createPost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await createPost(input);
    }),

  // Update post
  updatePost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await updatePost(input.id, {
        title: input.title,
        content: input.content,
      });
    }),

  // Delete post
  deletePost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await deletePost(input.id);
    }),
});
