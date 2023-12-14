import {z} from "zod";

export const Status = z.enum(["IN_CART", "PAYED", "REMUVED"])

export const productCart = z.object({
    name: z.string(),
    price: z.number(),
    status: Status,
    productId: z.string()
})