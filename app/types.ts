import {Product, Stock} from '@prisma/client'

export type ProductAndStock = Product & {
    stock: Stock | null
}
