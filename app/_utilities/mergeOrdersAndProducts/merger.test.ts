import {ProductToOrder} from "./merge";
import {cart, response} from "./mock";

describe("Test Product to Orders", () => {
    it('should be', () => {
        expect(ProductToOrder).toBeDefined()
    });

    it("should return an empty array on empty array input ", () => {
        expect(ProductToOrder([])).toEqual({})
    })

    it("should merge cart with product", () => {
        expect(ProductToOrder([cart])).toEqual(response)
    })
})