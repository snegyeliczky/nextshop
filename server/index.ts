import {createTRCPRouter} from './trpc';
import {productRouter} from "@/server/routers/product";
import {cartRouter} from "@/server/routers/cart";
import {stockRouter} from "@/server/routers/stock";

//TODO Add router tests

export const appRouter = createTRCPRouter({
    product: productRouter,
    cart: cartRouter,
    stock: stockRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;