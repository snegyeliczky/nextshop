import Image from 'next/image'
import {Product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";
import prisma from "@/prisma/db";


export default async function Home() {
    const prodsRes = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const prods: Product[] = await prodsRes.json()

    return (
        <main className="flex min-h-screen flex-row flex-wrap  items-center justify-around p-24">
            {prods.map((prod) => <ProductCard key={prod.id} product={prod}/>)}

        </main>
    )
}
