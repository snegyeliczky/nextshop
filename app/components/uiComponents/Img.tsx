import {FC} from 'react';

import Image from "next/image";

type Props = {
    src: string
    alt: string
}
const Img: FC<Props> = ({src, alt}) => {
    return (
        <div
            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Image src={src} alt={alt} width={500} height={500} quality={30} priority={false} placeholder={"empty"}
                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
    );
};

export default Img;