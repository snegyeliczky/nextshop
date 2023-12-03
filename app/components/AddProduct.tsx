'use client'

import {trpc} from "@/app/_trpc/client";
import {Product} from "@/app/types";
import {FC} from "react";

type props = {
    product: Product
    availableAmount?: number
}
const AddProduct: FC<props> = ({product, availableAmount}) => {
    const addToCart = trpc.addProduct.useMutation()


    return (
        <button
            disabled={!availableAmount || availableAmount <= 0}
            onClick={async () => addToCart.mutate({
                productId: product.id,
                name: product.name,
                price: product.price,
                status: "IN_CART",
                userId: "1"
            })
            }>
            Add product
        </button>
    );
};

export default AddProduct;