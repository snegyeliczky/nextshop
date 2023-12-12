import {FC} from "react";

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