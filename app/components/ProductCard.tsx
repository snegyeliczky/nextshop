import React, {FC} from 'react';
import {Product} from "@/app/types";
import AddProduct from "@/app/components/AddProduct";
import {serverClient} from "@/app/_trpc/serverClient";
import Img from "@/app/components/uiComponents/Img";
import Price from "@/app/components/uiComponents/Price";

type props = {
    product: Product
}

const ProductCard: FC<props> = async ({product}) => {

    const initStock = await serverClient.getStockForProduct({prodId: product.id})


    return product ? (
        <div className="">
            <Img src={product.img} alt={product.name}/>
            <div className="mt-2 flex justify-between">
                <div>
                    <h3 className="text-s text-gray-700">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Min Order: {product.minOrderAmount}</p>
                </div>
                <Price textColor={"text-sm font-medium text-gray-900"} text={"Price:"} price={product.price}/>
            </div>

            <AddProduct product={product} initStockAmount={initStock}/>
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;