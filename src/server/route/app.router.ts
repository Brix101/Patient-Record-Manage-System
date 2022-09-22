import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .query("hello", {
    resolve: () => {
      return "Hello from trpc server";
    },
  })
  .merge("users.", userRouter);

export type AppRouter = typeof appRouter;
