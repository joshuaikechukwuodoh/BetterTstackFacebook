import { protectedProcedure, publicProcedure, router } from "../index";
import { todoRouter } from "./todo";
import { userPostRouter } from "./user-post";
import { userCommentRouter } from "./user.comment";
import { userLikeRouter } from "./user.like";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  userPost: userPostRouter,
  userComment: userCommentRouter,
  userLike: userLikeRouter,
});

export type AppRouter = typeof appRouter;
