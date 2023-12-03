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
    const init = trpc.initStock.useMutation()

    return (
        <button onClick={() => {
            init.mutate(stock)
        }}>
            Init Stock
        </button>
    );
};

export default InitStock;