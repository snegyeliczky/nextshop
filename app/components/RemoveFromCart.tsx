'use client'
import React, {FC} from 'react';
import Button from "@/app/components/uiComponents/Button";

type props = {
    cartIds: number[]
    productId: string
    remove: (cartId: number, productId: string) => void
    isDisabled: boolean
}
const RemoveFromCart: FC<props> = ({cartIds, productId, remove, isDisabled}) => {


    return (
        <Button onclick={() => remove(cartIds[0], productId)} text={"Remove from cart"} isDisabled={isDisabled}/>
    );
};

export default RemoveFromCart;