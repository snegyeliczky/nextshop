import {publicProcedure, router} from './trpc';
import {createHTTPServer} from "@trpc/server/adapters/standalone";
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
        const p = await prisma.product.findMany()
        return p
    }),
    addProduct: publicProcedure.input(productCart).mutation(async (opts) => {
        const {input} = opts
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;