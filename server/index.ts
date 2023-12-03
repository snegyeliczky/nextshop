import {publicProcedure, router} from './trpc';
import {z} from "zod";
import prisma from "@/prisma/db";

const Status = z.enum(["IN_CART", "PAYED", "REMUVED"])


const productCart = z.object({
    name: z.string(),
    price: z.number(),
    status: Status,
    userId: z.string(),
    productId: z.string()
})
// add zod validation
export const appRouter = router({
    allCart: publicProcedure.query(async () => {
        return await prisma.product.findMany()

    }),
    addProduct: publicProcedure.input(productCart).mutation(async (opts) => {
        const {input} = opts
        return await prisma.product.create({
            data: {
                ...input
            }
        })

    }),
    removeProduct: publicProcedure.input(z.object({productId: z.number()})).mutation(async (opts) => {
        const {input} = opts
        await prisma.product.delete({
            where: {id: input.productId}
        })
    }),

    initStock: publicProcedure.input(z.array(z.object({
        productId: z.string(),
        quantity: z.number()
    }))).mutation(async (opts) => {
        const {input} = opts
        const res = await prisma.stock.createMany({
            data: input
        })
        return res

    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;