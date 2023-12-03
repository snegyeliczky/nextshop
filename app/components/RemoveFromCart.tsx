'use client'
import React, {FC} from 'react';
import {trpc} from "@/app/_trpc/client";

type props = {
    productId: string
}
const RemoveFromCart: FC<props> = ({productId}) => {
    const removeFromCart = trpc.removeProduct.useMutation()

    return (
        <button onClick={async () => await removeFromCart.mutate({productId})}>
            Remove from cart
        </button>
    );
};

export default RemoveFromCart;