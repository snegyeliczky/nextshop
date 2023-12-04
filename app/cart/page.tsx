import React from 'react';
import {Product} from "@/app/types";
import {serverClient} from "@/app/_trpc/serverClient";
import Link from "next/link";
import Cart from "@/app/components/Cart";
import Card from "@/app/components/uiComponents/Card";
import Navigation from "@/app/components/Navigation";


const Page = async () => {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const cartRes = await serverClient.allCart()


    return (
        <>
            <Navigation url={'/'} text={"To Shop"}/>
            <Card title={"Your Cart"}>
                <Cart cartItem={cartRes} persistedProductsMock={prods}/>
            </Card>
        </>
    );
};

export default Page;