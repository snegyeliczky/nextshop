export type Product = {
    name: string
    img: string
    minOrderAmount: number
    availableAmount: number,
    price: number,
    id: string
}

export type ProductModel = {
    name: string
    img: string
    minOrderAmount: number
    price: number,
    id: string
    stock: Stock | null
}

export type Stock = { productId: string, quantity: number }