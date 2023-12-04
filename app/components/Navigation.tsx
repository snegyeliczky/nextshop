import Link from "next/link";
import {FC} from "react";

type Props = {
    url: string
    text: string
}
const Navigation: FC<Props> = ({url, text}) => {
    return (
        <header className="flex items-end justify-end sticky p-8 ">
            <Link href={url}>{text}</Link>
        </header>
    );
};

export default Navigation