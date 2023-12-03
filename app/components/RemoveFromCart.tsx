'use client'
import React, {FC} from 'react';
import {trpc} from "@/app/_trpc/client";

type props = {
    cartId: number
    productId: string
}
const RemoveFromCart: FC<props> = ({cartId, productId}) => {
    const removeFromCart = trpc.removeProduct.useMutation()

    return (
        <button onClick={async () => await removeFromCart.mutate({cartId, productId})}>
            Remove from cart
        </button>
    );
};

export default RemoveFromCart;