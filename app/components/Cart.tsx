"use client"

import {Product} from "@/app/types";
import {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";
import {trpc} from "@/app/_trpc/client";
import CartProduct from "@/app/components/CartProduct";
import {ProductToOrder} from "@/app/_utilities/mergeOrdersAndProducts/merge";
import Spinner from "@/app/components/uiComponents/Spinner";

// TODO refactor cart to support individual cart item modification

type props = {
    cartItem: Awaited<ReturnType<(typeof serverClient)["allCart"]>>
    persistedProductsMock: Product[]
}


const Cart: FC<props> = ({cartItem, persistedProductsMock}) => {
    const getCart = trpc.getUserCart.useQuery(undefined, {initialData: cartItem})
    const removeFromCart = trpc.removeProduct.useMutation({onSettled: () => getCart.refetch()})
    const mergeOrderWithProduct = ProductToOrder(getCart.data, persistedProductsMock)
    const inCartMembers = Object.values(mergeOrderWithProduct)

    const isLoading = getCart.isLoading || removeFromCart.isLoading

    const remove = async (cartId: number, productId: string) => {
        await removeFromCart.mutate({cartId, productId})
    }
    return (
        <>
            {inCartMembers.length ? inCartMembers.map(cartMember => (
                cartMember.product &&
                <CartProduct
                    key={cartMember.product.id}
                    isLoading={isLoading}
                    product={cartMember.product}
                    count={cartMember.count}
                    cartIds={cartMember.cartIds}
                    remove={remove}
                />)) : <p className={"mt-1 text-s text-gray-500"}>Your cart is empty... :(</p>}
            {isLoading && <Spinner/>}
        </>
    );
};

export default Cart;