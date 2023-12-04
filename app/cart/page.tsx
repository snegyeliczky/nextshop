import React from 'react';
import {Product} from "@/app/types";
import {serverClient} from "@/app/_trpc/serverClient";
import Link from "next/link";
import Cart from "@/app/components/Cart";
import Card from "@/app/components/uiComponents/Card";


const Page = async () => {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const cartRes = await serverClient.allCart()


    return (
        <>
            <header className="flex items-end justify-end sticky p-8 ">
                <Link href={'/'}>To shop</Link>
            </header>
            <Card title={"Your Cart"}>
                <Cart cartItem={cartRes} persistedProductsMock={prods}/>
            </Card>
        </>
    );
};

export default Page;