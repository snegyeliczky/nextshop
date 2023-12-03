'use client'

import {trpc} from "@/app/_trpc/client";
import {Product} from "@/app/types";
import {FC} from "react";

type props = {
    product: Product
}
const AddProduct: FC<props> = ({product}) => {
    const addToCart = trpc.addProduct.useMutation()

    return (
        <button
            onClick={async () => addToCart.mutate({
                productId: product.id,
                name: product.name,
                price: product.price,
                status: "IN_CART",
                userId: "1"
            })}>
            Add product
        </button>
    );
};

export default AddProduct;