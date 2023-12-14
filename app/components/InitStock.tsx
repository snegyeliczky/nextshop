'use client'
import React, {FC} from 'react';
import {trpc} from "@/app/_trpc/client";

type FetchedProduct = {
    availableAmount: number
    id: string
    img: string
    minOrderAmount: number
    name: string
    price: number
}

const InitStock: FC = () => {
    const {data, isLoading} = trpc.product.fetchProducts.useQuery()


    const stock = data?.map((p: FetchedProduct) => ({
        productId: p.id,
        quantity: p.availableAmount
    }))
    const initProducts = data?.map((p: FetchedProduct) => ({
        id: p.id,
        name: p.name,
        img: p.img.toString(),
        minOrderAmount: p.minOrderAmount,
        price: p.price,
    }))

    const init = trpc.stock.initStock.useMutation()
    const initProds = trpc.product.initProducts.useMutation()


    return isLoading ? <p>Data is loading...</p> : (
        <button onClick={() => {
            init.mutate(stock)
            initProds.mutate(initProducts)
        }}>
            Init Stock
        </button>
    );
};

export default InitStock;