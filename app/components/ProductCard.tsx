import React, {FC} from 'react';
import {product} from "@/app/types";

type props = {
    product?: product
}

const ProductCard: FC<props> = ({product}) => {

    return product ? (
        <div
            className={'flex flex-col items-center justify-between p-5 border-dotted border-2 border-sky-300 max-h-96 w-44 m-5'}>
            <div>{product.name}</div>
            <img src={product.img}/>
            <div>
                <div>Available: {product.availableAmount}</div>
                <div>Min Order: {product.minOrderAmount} </div>
            </div>
            <button>Add</button>
        </div>
    ) : <div> Empty </div>;
};

export default ProductCard;