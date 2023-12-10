import React, {FC} from 'react';
import RemoveFromCart from "@/app/components/RemoveFromCart";
import {Product} from "@prisma/client";
import Img from "@/app/components/uiComponents/Img";
import Price from "@/app/components/uiComponents/Price";


type Props = {
    product: Product
    count: number
    cartIds: number[]
    remove: (cartId: number, productId: string) => void
    isLoading: boolean
}

const CartProduct: FC<Props> = ({cartIds, product, count, remove, isLoading}) => {
    const isEnough = product.minOrderAmount <= count
    const textColor = isEnough ? "mt-1 text-sm text-black-500" : "mt-1 text-sm text-gray-500"
    return (
        <div key={product.id}>
            <Img src={product.img} alt={product.name}/>
            {!isEnough &&
                <p className="mt-1 text-sm text-red-400"> {`Please reach minimal order: ${product?.minOrderAmount} `}</p>
            }
            <p className={textColor}>Total Amount: {count}</p>
            <Price textColor={textColor} text={"Total price:"} price={(product?.price ?? 0) * count}/>
            <RemoveFromCart cartIds={cartIds} productId={product.id} remove={remove} isDisabled={isLoading}/>
        </div>
    );
};

export default CartProduct;