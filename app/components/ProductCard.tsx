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
        <div className="">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image src={product.img} alt={product.name} width={500} height={500}
                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
            </div>
            <div className="mt-2 flex justify-between">
                <div>
                    <h3 className="text-s text-gray-700">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Min Order: {product.minOrderAmount}</p>
                </div>

                <p className="text-sm font-medium text-gray-900">Price: {product.price}</p>
            </div>

            <AddProduct product={product} initStockAmount={initStock}/>
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;