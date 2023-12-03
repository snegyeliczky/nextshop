import React, {FC} from 'react';
import {Product} from "@/app/types";
import AddProduct from "@/app/components/AddProduct";
import {serverClient} from "@/app/_trpc/serverClient";
import Image from 'next/image'

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
            <Image src={product.img} alt={product.name} width={500} height={500}/>
            <div>Price: {product.price}</div>
            <div>Min Order: {product.minOrderAmount} </div>
            <AddProduct product={product} initStockAmount={initStock}/>
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;