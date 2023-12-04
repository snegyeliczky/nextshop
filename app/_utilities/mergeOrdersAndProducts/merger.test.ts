import {ProductToOrder} from "./merge";

describe("Test Product to Orders", () => {
    it('should be', () => {
        expect(ProductToOrder).toBeDefined()
    });

    it(" should return an empty array on empty array input ", () => {
        expect(ProductToOrder([], [])).toEqual({})
    })

})