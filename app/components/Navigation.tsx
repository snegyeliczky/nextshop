import Link from "next/link";
import {FC} from "react";
import {UserButton} from "@clerk/nextjs";

type Props = {
    url: string
    text: string
}
const Navigation: FC<Props> = ({url, text}) => {


    return (
        <header className="flex items-end justify-between sticky p-9 ">
            <UserButton afterSignOutUrl={'/'}/>
            <Link href={url}>{text}</Link>
        </header>
    );
};

export default Navigation