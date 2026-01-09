import { db } from "@Backend/db";
import { likes } from "@Backend/db/schema/likes";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { router, publicProcedure } from "../index";

export const userLikeRouter = router({
  // 🔹 Get all likes
  getAll: publicProcedure.query(async () => {
    return await db.select().from(likes);
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
      return await db.insert(likes).values(input);
    }),


  // 🔹 Delete a like
  deleteLike: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return await db
        .delete(likes)
        .where(eq(likes.id, input.id));
    }),
}); 