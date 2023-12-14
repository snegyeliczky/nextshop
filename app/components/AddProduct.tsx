'use client'

import {trpc} from "@/app/_trpc/client";
import {ProductAndStock} from "@/app/types";
import React, {FC} from "react";

import Button from "@/app/components/uiComponents/Button";
import Spinner from "@/app/components/uiComponents/Spinner";


type props = {
    product: ProductAndStock
}
const AddProduct: FC<props> = ({product}) => {

    const getStock = trpc.product.getStockForProduct.useQuery({prodId: product.id}, {
        initialData: product.stock,
    })

    const addToCart = trpc.product.addProduct.useMutation({
        onSettled: () => getStock.refetch()
    })

    const amount = getStock.data?.quantity

    const addProduct = async () => addToCart.mutate({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
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