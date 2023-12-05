import {publicProcedure, router} from './trpc';
import {z} from "zod";
import {prisma} from "@/prisma/db";
import {auth} from "@clerk/nextjs";

//TODO Add router tests
//TODO study to separate routs
//TODO after persist products create relation between stock and product and return once to cart


const Status = z.enum(["IN_CART", "PAYED", "REMUVED"])


const productCart = z.object({
    name: z.string(),
    price: z.number(),
    status: Status,
    productId: z.string()
})
// add zod validation
export const appRouter = router({
    allCart: publicProcedure.query(async () =>
        await prisma.product.findMany()
    ),
    getUserCart: publicProcedure.query(async () => {
        const {userId} = auth()
        return userId ? await prisma.product.findMany({
            where: {
                userId: userId
            }
        }) : []
    }),
    addProduct: publicProcedure.input(productCart).output(z.object({stock: z.number()})).mutation(async (opts) => {
        const {input} = opts
        const {userId} = auth()
        const currentStock = await prisma.stock.update({
            where: {productId: input.productId}, data: {
                quantity: {
                    decrement: 1
                }
            }
        })
        userId && await prisma.product.create({
            data: {
                ...input,
                userId: userId
            }
        })
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
        return await prisma.stock.createMany({
            data: input
        })


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