import {FC} from "react";
import {Prisma} from ".prisma/client";
import Decimal = Prisma.Decimal;

type Props = {
    textColor: string
    text: string
    price: number
    currency?: string
}

const Price: FC<Props> = ({price, currency = "$", textColor, text}) => {
    return (
        <p className={textColor}>{`${text} ${price}${currency}`}</p>
    );
};

export default Price;