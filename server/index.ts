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
    addProduct: publicProcedure.input(productCart).output(z.object({stock: z.number()})).mutation(async (opts) => {
        const {input} = opts
        const currentStock = await prisma.stock.update({
            where: {productId: input.productId}, data: {
                quantity: {
                    decrement: 1
                }
            }
        })
        await prisma.product.create({
            data: {
                ...input
            }
        })
        console.log(currentStock)
        return {stock: currentStock.quantity}
    }),
    removeProduct: publicProcedure.input(z.object({
        cartId: z.number(),
        productId: z.string()
    })).mutation(async (opts) => {
        const {input} = opts
        await prisma.stock.update({
            where: {productId: input.productId}, data: {
                quantity: {
                    increment: 1
                }
            }
        })
        await prisma.product.delete({
            where: {id: input.cartId}
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

    }),
    getStockForProduct: publicProcedure.input(z.object({prodId: z.string()})).query(async (opts) => {
        const {input} = opts
        return await prisma.stock.findUnique({
            where: {productId: input.prodId}
        })
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;