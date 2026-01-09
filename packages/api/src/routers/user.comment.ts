/**
 * User Comments API Router
 * Uses core business logic from @backend/core
 */
import { z } from "zod";
import { router, publicProcedure } from "../index";

// Import from core package
import {
  getAllComments,
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "@backend/core";

export const userCommentRouter = router({
  // Get all comments
  getAll: publicProcedure.query(async () => {
    return await getAllComments();
  }),

  // Get comments by post ID
  getByPostId: publicProcedure
    .input(z.object({ postId: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getCommentsByPostId(input.postId);
    }),

  // Get single comment by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getCommentById(input.id);
    }),

  // Create a comment
  createComment: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        postId: z.string().min(1),
        userId: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await createComment(input);
    }),

  // Update a comment
  updateComment: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await updateComment(input.id, input.content);
    }),

  // Delete a comment
  deleteComment: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteComment(input.id);
    }),
});
