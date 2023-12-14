import {serverClient} from "@/app/_trpc/serverClient";
import {Product} from "@prisma/client";

export const ProductToOrder = (
    cartItem: Awaited<ReturnType<(typeof serverClient.cart)["getUserCart"]>>,
) => cartItem.reduce((acc, current) => {
    const currentCartId = current.id
    const id = current.productId

    acc[id] ? acc[id] = {
        ...acc[id],
        count: acc[id].count + 1,
        cartIds: [...acc[id].cartIds, currentCartId]
    } : acc[id] = {
        count: 1,
        product: current.product,
        cartIds: [currentCartId]
    }
    return acc
}, {} as Record<string, { count: number, product?: Product, cartIds: number[] }>)