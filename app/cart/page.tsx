import React from 'react';
import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import {serverClient} from "@/app/_trpc/serverClient";
import Link from "next/link";
import Cart from "@/app/components/Cart";


const Page = async () => {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const cartRes = await serverClient.allCart()
    // const cartProds = cartRes.map(p => ({
    //         product: prods.find(prod => p.productId === prod.id),
    //         cartId: p.id
    //     })
    // )


    return (
        <main className="flex min-h-screen flex-row flex-wrap  items-center justify-around p-24">
            <h1>Chart</h1>
            <Link href={'/'}>To shop</Link>
            <Cart cartItem={cartRes} persistedProductsMock={prods}/>
            {/*{cartProds &&*/}
            {/*    cartProds.map(prod =>*/}
            {/*        prod.product && <ProductCard key={prod.cartId} product={prod.product} cartId={prod.cartId}/>)}*/}
        </main>
    );
};

export default Page;