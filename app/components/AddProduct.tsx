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
            <p className="mt-1 text-lg font-medium text-gray-900">Available: {amount}</p>
            <button
                className={"bg-violet-100 hover:bg-violet-300 active:bg-violet-600 focus:outline-2 p-1.5 rounded mt-2 text-sm text-gray-700"}
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