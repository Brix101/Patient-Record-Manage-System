import * as trpc from "@trpc/server";
import {
  createPostSchema,
  getSinglePostSchema,
} from "../../schema/post.schema";
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Can not create a post while logged out",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: Number(ctx.user?.id),
            },
          },
        },
      });

      return post;
    },
  })
  .query("posts", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  });
