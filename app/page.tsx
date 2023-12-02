import Image from 'next/image'
import {product} from "@/app/types";
import ProductCard from "@/app/components/ProductCard";


export default async function Home() {
    const res = await fetch('https://63c10327716562671870f959.mockapi.io/products', {cache: "default"})
    const jsonRes: product[] = await res.json()
    console.log(jsonRes)


    return (
        <main className="flex min-h-screen flex-row flex-wrap  items-center justify-around p-24">
            {jsonRes.map((prod) => <ProductCard key={prod.id} product={prod}/>)}
        </main>
    )
}
