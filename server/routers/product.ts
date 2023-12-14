import {createTRCPRouter, publicProcedure} from "@/server/trpc";
import {prisma} from "@/prisma/db";
import {z} from "zod";
import {auth} from "@clerk/nextjs";
import {Prisma} from ".prisma/client";
import {productCart} from "@/server/routers/validationTypes";

export const productRouter = createTRCPRouter({
    fetchProducts: publicProcedure.query(async () => {
        const p = await fetch('https://63c10327716562671870f959.mockapi.io/products')
        return await p.json()
    }),
    getProducts: publicProcedure.query(async () => await prisma.product.findMany({include: {stock: true}})),
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
                    price: new Prisma.Decimal(input.price),
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
    initProducts: publicProcedure.input(z.array(z.object({
        id: z.string(),
        name: z.string(),
        img: z.string(),
        minOrderAmount: z.number(),
        price: z.number(),
    }))).mutation(async (opts) => {
        const {input} = opts
        input.forEach(async (product) => {
            await prisma.product.create({data: {...product, price: new Prisma.Decimal(product.price)}})
        })
        return
    }),
    getStockForProduct: publicProcedure.input(z.object({prodId: z.string()})).query(async (opts) => {
        const {input} = opts
        return await prisma.stock.findUnique({
            where: {productId: input.prodId}
        })
    })
})