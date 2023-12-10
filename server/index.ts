import {publicProcedure, router} from './trpc';
import {z} from "zod";
import {prisma} from "@/prisma/db";
import {auth} from "@clerk/nextjs";

//TODO Add router tests
//TODO study to separate routs


const Status = z.enum(["IN_CART", "PAYED", "REMUVED"])


const productCart = z.object({
    name: z.string(),
    price: z.number(),
    status: Status,
    productId: z.string()
})
export const appRouter = router({
    allCart: publicProcedure.query(async () =>
        await prisma.cart.findMany()
    ),
    fetchProducts: publicProcedure.query(async () => {
        const p = await fetch('https://63c10327716562671870f959.mockapi.io/products')
        return await p.json()

    }),
    getProducts: publicProcedure.query(async () => await prisma.product.findMany({include: {stock: true}})),
    getUserCart: publicProcedure.query(async () => {
        const {userId} = auth()
        return userId ? await prisma.cart.findMany({
            where: {
                userId: userId
            },
            include: {
                product: true
            }
        }) : []
    }),
    addProduct: publicProcedure.input(productCart).output(z.object({stock: z.number()})).mutation(async (opts) => {
        const {input} = opts
        const {userId} = auth()
        const availableStock = await prisma.stock.findUnique({where: {productId: input.productId}})
        const isInStock = Boolean(availableStock?.quantity)
        if (isInStock && userId) {
            const currentStock = await prisma.stock.update({
                where: {productId: input.productId}, data: {
                    quantity: {
                        decrement: 1
                    }
                }
            })
            await prisma.cart.create({
                data: {
                    ...input,
                    userId: userId
                }
            })
            return {stock: currentStock.quantity}
        }
        return {stock: 0}
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
        await prisma.cart.delete({
            where: {id: input.cartId}
        })
    }),

    initStock: publicProcedure.input(z.array(z.object({
        productId: z.string(),
        quantity: z.number()
    }))).mutation(async (opts) => {
        const {input} = opts
        return prisma.stock.createMany({
            data: input
        })
    }),
    initProducts: publicProcedure.input(z.array(z.object({
        id: z.string(),
        name: z.string(),
        img: z.string(),
        minOrderAmount: z.number(),
        price: z.number(),
    }))).mutation(async (opts) => {
        const {input} = opts
        return prisma.product.createMany({data: input})
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