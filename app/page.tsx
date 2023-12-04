import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import React from "react";
import InitStock from "@/app/components/InitStock";
import Card from "@/app/components/uiComponents/Card";


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
            <Card title={"Best Products"}>
                {prods.map((prod) => <ProductCard key={prod.id} product={prod}/>)}
            </Card>
        </>
    )
}
