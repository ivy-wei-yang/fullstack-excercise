import { isValidStatus, isValidOrder } from "../validationHelper";

describe("isValidStatus: ", () => {
    it("Null status returns true", () => {
        const actual = isValidStatus(null);
        expect(actual).toBeTruthy();
    });
    it("A valid status returns true", () => {
        const actual = isValidStatus("prospective");
        expect(actual).toBeTruthy();
    });
    it("An invalid status returns false", () => {
        const actual = isValidStatus("errorStatus");
        expect(actual).toBeFalsy();
    });
});
describe("validateOrderAndReturnValue: ", () => {
    it("Null order should return null", () => {
        const actual = isValidOrder(null);
        expect(actual).toBeTruthy();
    });
    it("A valid order should be returned", () => {
        const actual = isValidOrder("ASC");
        expect(actual).toBeTruthy();
    });
    it("An invalid order should throw error", () => {
        const actual = isValidOrder("errorOrder");
        expect(actual).toBeFalsy();
    });
});
