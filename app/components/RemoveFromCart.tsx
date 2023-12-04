'use client'
import React, {FC} from 'react';
import Button from "@/app/components/uiComponents/Button";

type props = {
    cartIds: number[]
    productId: string
    remove: (cartId: number, productId: string) => void
}
const RemoveFromCart: FC<props> = ({cartIds, productId, remove}) => {


    return (
        <Button onclick={() => remove(cartIds[0], productId)} text={"Remove from cart"}/>
    );
};

export default RemoveFromCart;