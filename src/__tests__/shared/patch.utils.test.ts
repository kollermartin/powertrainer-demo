import preparePatchOperations from "../../shared/utils/patch.utils";

describe("preparePatchOperations", () => {
    it("returns an empty array when previous and new values are identical", () => {
        const previousValue = { name: "John", age: 30 };
        const newValue = { name: "John", age: 30 };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([]);
    });

    it("returns correct operations when a field is added", () => {
        const previousValue = { name: "John" };
        const newValue = { name: "John", age: 30 };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([{ op: "add", path: "/age", value: 30 }]);
    });

    it("returns correct operations when a field is removed", () => {
        const previousValue = { name: "John", age: 30 };
        const newValue = { name: "John" };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([{ op: "remove", path: "/age" }]);
    });

    it("returns correct operations when a field is replaced", () => {
        const previousValue = { name: "John", age: 30 };
        const newValue = { name: "John", age: 31 };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([{ op: "replace", path: "/age", value: 31 }]);
    });

    it("returns correct operations for nested objects", () => {
        const previousValue = { name: "John", address: { city: "New York" } };
        const newValue = { name: "John", address: { city: "Los Angeles" } };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([{ op: "replace", path: "/address/city", value: "Los Angeles" }]);
    });

    it("handles arrays correctly", () => {
        const previousValue = { items: ["apple", "banana"] };
        const newValue = { items: ["apple", "banana", "cherry"] };
        const result = preparePatchOperations(previousValue, newValue);
        expect(result).toEqual([{ op: "add", path: "/items/2", value: "cherry" }]);
    });
});
