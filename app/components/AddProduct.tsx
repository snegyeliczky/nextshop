'use client'

import {trpc} from "@/app/_trpc/client";
import {Product} from "@/app/types";
import React, {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";

type props = {
    product: Product
    initStockAmount: Awaited<ReturnType<(typeof serverClient)["getStockForProduct"]>>
}
const AddProduct: FC<props> = ({product, initStockAmount}) => {
    const getStack = trpc.getStockForProduct.useQuery({prodId: product.id}, {
        initialData: initStockAmount, refetchOnMount: false,
        refetchOnReconnect: false,
    })
    const addToCart = trpc.addProduct.useMutation({
        onSettled: () => getStack.refetch()
    })


    return (
        <>
            <div>Available: {getStack.data?.quantity}</div>
            <button
                disabled={!initStockAmount || initStockAmount.quantity <= 0}
                onClick={async () => await addToCart.mutate({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    status: "IN_CART",
                    userId: "1"
                })
                }>
                Add product
            </button>
        </>
    );
};

export default AddProduct;