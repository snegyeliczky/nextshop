import React, {FC} from 'react';

type Props = {
    isDisabled?: boolean
    onclick: Function
    text: string
}

const Button: FC<Props> = ({text, onclick, isDisabled = false}) => {
    return (
        <button
            className={`bg-violet-100 focus:outline-2 p-1.5 rounded mt-2 text-sm text-gray-700 
            ${isDisabled ? "hover:bg-red-300" : "active:bg-violet-600 hover:bg-violet-300"}`}
            disabled={isDisabled}
            onClick={async () => await onclick()
            }>
            {text}
        </button>
    );
};

export default Button;