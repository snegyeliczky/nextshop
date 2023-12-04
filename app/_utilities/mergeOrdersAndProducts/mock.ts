import {$Enums} from ".prisma/client";
import Status = $Enums.Status;

export const product = {
    "id": "62863b689c1bcb9946a0c8ac",
    "name": "Bolts",
    "img": "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
    "availableAmount": 1000,
    "minOrderAmount": 20,
    "price": 0.2
}

export const cart = {
    "id": 178,
    "name": "Bolts",
    "userId": "1",
    "productId": "62863b689c1bcb9946a0c8ac",
    "price": 0,
    "status": "IN_CART" as Status
}

export const response = {
    "62863b689c1bcb9946a0c8ac": {
        "count": 1,
        "product": {
            "id": "62863b689c1bcb9946a0c8ac",
            "name": "Bolts",
            "img": "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
            "availableAmount": 1000,
            "minOrderAmount": 20,
            "price": 0.2
        },
        "cartIds": [
            178
        ]
    }
}