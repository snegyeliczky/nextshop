'use client'
import React, {FC} from 'react';
import {Product} from "@/app/types";
import {trpc} from "@/app/_trpc/client";

type props = {
    prods: Product[]
}
const InitStock: FC<props> = ({prods}) => {
    const stock = prods.map(p => ({
        productId: p.id,
        quantity: p.availableAmount
    }))
    const initProducts = prods.map(p => ({
        id: p.id,
        name: p.name,
        img: p.img.toString(),
        minOrderAmount: p.minOrderAmount,
        price: p.price,
    }))

    const init = trpc.initStock.useMutation()
    const initProds = trpc.initProducts.useMutation()

    return (
        <button onClick={() => {
            init.mutate(stock)
            initProds.mutate(initProducts)

        }}>
            Init Stock
        </button>
    );
};

export default InitStock;