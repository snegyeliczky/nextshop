import React from 'react';
import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import {serverClient} from "@/app/_trpc/serverClient";
// import {trpc} from "@/app/_trpc/client";

const Page = async () => {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const cartRes = await serverClient.allCart()
    const cartProds = cartRes.map(p => prods.find(prod => p.productId === prod.id))


    return (
        <main className="flex min-h-screen flex-row flex-wrap  items-center justify-around p-24">
            <h1>Chart</h1>
            {cartProds.map(prod => <ProductCard key={prod?.id} product={prod}/>)}
        </main>
    );
};

export default Page;