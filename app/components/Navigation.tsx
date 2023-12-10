import Link from "next/link";
import {FC} from "react";
import {UserButton} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs"

type Props = {
    url: string
    text: string
}
const Navigation: FC<Props> = async ({url, text}) => {
    const user = await currentUser()

    return (
        <header className="flex items-end justify-between fixed w-full p-5 z-10">
            <div className={"flex items-center "}>
                <UserButton afterSignOutUrl={'/'}/>
                <p className={"pl-3 text-sm font-extralight"}>Welcome {user?.firstName}</p>
            </div>
            <Link href={url}>{text}</Link>
        </header>
    );
};

export default Navigation