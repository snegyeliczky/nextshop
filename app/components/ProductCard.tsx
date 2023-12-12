import React, {FC} from 'react';
import {ProductAndStock} from "@/app/types";
import AddProduct from "@/app/components/AddProduct";
import Img from "@/app/components/uiComponents/Img";
import Price from "@/app/components/uiComponents/Price";


type props = {
    product: ProductAndStock
}

const ProductCard: FC<props> = async ({product}) => {

    return product ? (
        <div className="relative">
            <Img src={product.img} alt={product.name}/>
            <div className="mt-2 flex justify-between">
                <div>
                    <h3 className="text-m font-medium text-gray-700">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Min Order: {product.minOrderAmount}</p>
                </div>
                <Price textColor={"text-m font-medium text-gray-900"} text={"Price:"} price={Number(product.price)}/>
            </div>

            <AddProduct product={product}/>
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;