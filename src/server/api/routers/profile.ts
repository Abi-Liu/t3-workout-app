import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(
      z.object({
        age: z.number(),
        height: z.number(),
        weight: z.number(),
        goalWeight: z.number(),
        caloriesGoal: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.profile.create({
        data: {
          age: input.age,
          userId: ctx.session.user.id,
          height: input.height,
          weight: input.weight,
          goalWeight: input.goalWeight,
          caloriesGoal: input.caloriesGoal,
        },
      });
    }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.profile.findFirst({
      where: { userId: ctx.session.user.id },
    });
  }),
});
