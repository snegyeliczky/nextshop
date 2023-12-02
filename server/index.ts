import {publicProcedure, router} from './trpc';
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {z} from "zod";

export const appRouter = router({
    allCart: publicProcedure.query(async () => {
        return [1, 2, 3]
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;