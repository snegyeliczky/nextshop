import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/db";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const addedProduct = await prisma.product.create({
        data: {name: body.name, price: body.price, status: body.status, userId: body.userId, productId: body.productId}
    })
    console.log("got it")
    return NextResponse.json(addedProduct, {status: 201})
}