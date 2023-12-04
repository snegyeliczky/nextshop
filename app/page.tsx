import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import React from "react";
import InitStock from "@/app/components/InitStock";
import Card from "@/app/components/uiComponents/Card";
import Navigation from "@/app/components/Navigation";


export default async function Home() {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()
    const isInit = false


    return (
        <>
            <Navigation url={'/cart'} text={"To Cart"}/>
            {isInit && <InitStock prods={prods}/>}
            <Card title={"Best Products"}>
                {prods.map((prod) => <ProductCard key={prod.id} product={prod}/>)}
            </Card>
        </>
    )
}
