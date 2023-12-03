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
        initialData: initStockAmount,
    })
    const addToCart = trpc.addProduct.useMutation({
        onSettled: () => getStack.refetch()
    })

    const amount = getStack.data?.quantity

    return (
        <>
            <div>Available: {amount}</div>
            <button
                className={"bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 p-1 rounded "}
                disabled={!amount || amount <= 0}
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