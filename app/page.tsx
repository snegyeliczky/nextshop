import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import React from "react";
import InitStock from "@/app/components/InitStock";


export default async function Home() {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const isInit = false


    return (
        <>
            <header className="flex items-end justify-end sticky p-8 ">
                <div><Link href={'/cart'}>To cart</Link></div>
                {isInit && <InitStock prods={prods}/>}
            </header>
            <div className="bg-amber-50">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Products</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {prods.map((prod) => <ProductCard key={prod.id} product={prod}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}
