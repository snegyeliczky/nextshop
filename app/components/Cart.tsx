"use client"

import {Product} from "@/app/types";
import {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";
import {trpc} from "@/app/_trpc/client";
import CartProduct from "@/app/components/CartProduct";

type props = {
    cartItem: Awaited<ReturnType<(typeof serverClient)["allCart"]>>
    persistedProductsMock: Product[]
}


const Cart: FC<props> = ({cartItem, persistedProductsMock}) => {
    const getCart = trpc.allCart.useQuery(undefined, {initialData: cartItem})
    const removeFromCart = trpc.removeProduct.useMutation({onSettled: () => getCart.refetch()})
    const mergeOrderWithProduct = getCart.data.reduce((acc, current) => {
        const currentCartId = current.id
        const id = current.productId

        acc[id] ? acc[id] = {
            ...acc[id],
            count: acc[id].count + 1,
            cartIds: [...acc[id].cartIds, currentCartId]
        } : acc[id] = {
            count: 1,
            product: persistedProductsMock.find(p => p.id === id),
            cartIds: [currentCartId]
        }
        return acc
    }, {} as Record<string, { count: number, product?: Product, cartIds: number[] }>)
    const inCartMembers = Object.values(mergeOrderWithProduct)

    const remove = async (cartId: number, productId: string) => {
        await removeFromCart.mutate({cartId, productId})
    }

    return (
        <>
            {inCartMembers.map(cartMember => (
                cartMember.product &&
                <CartProduct
                    key={cartMember.product.id}
                    product={cartMember.product}
                    count={cartMember.count}
                    cartIds={cartMember.cartIds}
                    remove={remove}
                />))}
        </>
    );
};

export default Cart;