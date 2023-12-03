'use client'
import React, {FC} from 'react';

type props = {
    cartIds: number[]
    productId: string
    remove: (cartId: number, productId: string) => void
}
const RemoveFromCart: FC<props> = ({cartIds, productId, remove}) => {


    return (
        <button onClick={async () => {
            await remove(cartIds[0], productId)

        }}>
            Remove from cart
        </button>
    );
};

export default RemoveFromCart;