import {createTRCPRouter, publicProcedure} from "@/server/trpc";
import {prisma} from "@/prisma/db";
import {auth} from "@clerk/nextjs";

export const cartRouter = createTRCPRouter({
    allCart: publicProcedure.query(async () =>
        await prisma.cart.findMany()
    ),
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
})