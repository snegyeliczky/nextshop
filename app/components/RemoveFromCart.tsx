'use client'
import React, {FC} from 'react';

type props = {
    cartIds: number[]
    productId: string
    remove: (cartId: number, productId: string) => void
}
const RemoveFromCart: FC<props> = ({cartIds, productId, remove}) => {


    return (
        <button
            className={"bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-1 rounded "}
            onClick={async () => {
                await remove(cartIds[0], productId)

            }}>
            Remove from cart
        </button>
    );
};

export default RemoveFromCart;