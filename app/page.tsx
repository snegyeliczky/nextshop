import ProductCard from "@/app/components/ProductCard";
import React from "react";
import InitStock from "@/app/components/InitStock";
import Card from "@/app/components/uiComponents/Card";
import Navigation from "@/app/components/Navigation";
import {serverClient} from "@/app/_trpc/serverClient";


export default async function Home() {

    const products = await serverClient.getProducts()
    const isInit = false


    return (
        <>
            <Navigation url={'/cart'} text={"To Cart"}/>
            {isInit && <InitStock prods={products}/>}
            <Card title={"Best Products"}>
                {products.map((prod) => <ProductCard key={prod.id} product={prod}/>)}
            </Card>
        </>
    )
}
