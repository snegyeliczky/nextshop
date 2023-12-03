import React, {FC} from 'react';
import {Product} from "@/app/types";
import AddProduct from "@/app/components/AddProduct";
import RemoveFromCart from "@/app/components/RemoveFromCart";
import {serverClient} from "@/app/_trpc/serverClient";

type props = {
    product: Product
    cartId?: number
}

const ProductCard: FC<props> = async ({product, cartId}) => {

    const initStock = await serverClient.getStockForProduct({prodId: product.id})


    return product ? (
        <div
            className={'flex flex-col items-center justify-between p-5 border-dotted border-2 border-sky-300 max-h-96 w-44 m-5'}>
            <div>{product.name}</div>
            <img src={product.img}/>
            <div>
                <div>Min Order: {product.minOrderAmount} </div>
            </div>
            <AddProduct product={product} initStockAmount={initStock}/>
            {cartId && <RemoveFromCart cartId={cartId} productId={product.id}/>}
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;