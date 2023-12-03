'use client'
import React, {FC} from 'react';
import {trpc} from "@/app/_trpc/client";


type props = {
    cartIds: number[]
    productId: string
    remove: (cartId: number, productId: string) => void
}
const RemoveFromCart: FC<props> = ({cartIds, productId, remove}) => {

    // const removeFromCart = trpc.removeProduct.useMutation()


    return (
        <button onClick={async () => {
            await remove(cartIds[0], productId)
            // await removeFromCart.mutate({cartId: cartIds[0], productId})

        }}>
            Remove from cart
        </button>
    );
};

export default RemoveFromCart;