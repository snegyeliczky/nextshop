"use client"

import {Product} from "@/app/types";
import {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";
import {trpc} from "@/app/_trpc/client";
import RemoveFromCart from "@/app/components/RemoveFromCart";
import Image from 'next/image'

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
    const inCartObj = Object.values(mergeOrderWithProduct)

    const remove = async (cartId: number, productId: string) => {
        await removeFromCart.mutate({cartId, productId})
    }

    return (
        <>
            {inCartObj.map(el => (
                <div key={el?.product?.id}>
                    <Image src={el?.product?.img ?? ""} alt={el?.product?.name ?? ""} width={500} height={500}/>
                    <h1> {Number(el?.product?.minOrderAmount) > el.count ? `Please add more to reach minimal order: ${el?.product?.minOrderAmount} ` : ""}</h1>
                    <h1>Amount: {el.count}</h1>
                    <h2>price: {(el?.product?.price ?? 0) * el.count}</h2>
                    {el?.product && <RemoveFromCart cartIds={el.cartIds} productId={el?.product?.id} remove={remove}/>}
                </div>))}
        </>
    );
};

export default Cart;