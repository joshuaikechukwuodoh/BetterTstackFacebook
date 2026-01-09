import { db } from "@Backend/db";
import { comments } from "@Backend/db/schema/comments";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { router, publicProcedure } from "../index";

export const userCommentRouter = router({
  // 🔹 Get all comments
  getAll: publicProcedure.query(async () => {
    return await db.select().from(comments);
  }),

  // 🔹 Create a comment
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
      return await db.insert(comments).values(input);
    }),

  // 🔹 Update a comment
  updateComment: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db
        .update(comments)
        .set({ content: input.content })
        .where(eq(comments.id, input.id));
    }),

  // 🔹 Delete a comment
  deleteComment: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db
        .delete(comments)
        .where(eq(comments.id, input.id));
    }),
});
