'use client'

import {trpc} from "@/app/_trpc/client";
import {Product} from "@/app/types";
import React, {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";
import Button from "@/app/components/uiComponents/Button";

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

    const addProduct = async () => await addToCart.mutate({
        productId: product.id,
        name: product.name,
        price: product.price,
        status: "IN_CART",
        userId: "1"
    })

    return (
        <>
            <p className="mt-1 text-lg font-medium text-gray-900">Available: {amount}</p>
            <Button isDisabled={!amount || amount <= 0} onclick={addProduct} text={"Add product"}/>
        </>
    );
};

export default AddProduct;