'use client'

import {trpc} from "@/app/_trpc/client";
import {Product} from "@/app/types";
import React, {FC} from "react";
import {serverClient} from "@/app/_trpc/serverClient";
import Button from "@/app/components/uiComponents/Button";
import Spinner from "@/app/components/uiComponents/Spinner";


type props = {
    product: Product
    initStockAmount: Awaited<ReturnType<(typeof serverClient)["getStockForProduct"]>>
}
const AddProduct: FC<props> = ({product, initStockAmount}) => {

    const getStock = trpc.getStockForProduct.useQuery({prodId: product.id}, {
        initialData: initStockAmount,
    })

    const addToCart = trpc.addProduct.useMutation({
        onSettled: () => getStock.refetch()
    })

    const amount = getStock.data?.quantity

    const addProduct = async () => addToCart.mutate({
        productId: product.id,
        name: product.name,
        price: product.price,
        status: "IN_CART",
    })

    const isAdding = getStock.isLoading || addToCart.isLoading

    return (<>
        <p className="mt-1 text-sm font-sm text-gray-900">Available: {amount}</p>
        <Button isDisabled={(!amount || amount <= 0) || isAdding} onclick={addProduct} text={"Add product"}/>
        {isAdding && <Spinner/>}
    </>)
};

export default AddProduct;