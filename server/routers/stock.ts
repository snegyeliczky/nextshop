import {createTRCPRouter, publicProcedure} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/prisma/db";

export const stockRouter = createTRCPRouter({
    initStock: publicProcedure.input(z.array(z.object({
        productId: z.string(),
        quantity: z.number()
    }))).mutation(async (opts) => {
        const {input} = opts
        return prisma.stock.createMany({
            data: input
        })
    }),
})