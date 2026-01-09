import { db } from "@Backend/db";
import { posts } from "@Backend/db/schema/posts";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { router, publicProcedure } from "../index";

export const userPostRouter = router({
  // 🔹 Get all posts
  getAll: publicProcedure.query(async () => {
    return await db.select().from(posts);
  }),

  // 🔹 Create post
  createPost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db.insert(posts).values(input);
    }),

  // 🔹 Update post
  updatePost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db
        .update(posts)
        .set({
          title: input.title,
          content: input.content,
        })
        .where(eq(posts.id, input.id));
    }),

  // 🔹 Delete post
  deletePost: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db
        .delete(posts)
        .where(eq(posts.id, input.id));
    }),
});
