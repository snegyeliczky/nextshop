import {publicProcedure, router} from './trpc';
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {z} from "zod";
import prisma from "@/prisma/db";


export const appRouter = router({
    allCart: publicProcedure.query(async () => {
        const p = await prisma.product.findMany()
        return p
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;