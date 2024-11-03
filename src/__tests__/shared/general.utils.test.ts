import UserInfo from "../../store/user/UserInfo";
import { isDefined, prepareFullName } from "../../shared/utils/general.utils";
import { mockUserInfo } from "../../test/__mocks__/user-info.mock";

describe("isDefined", () => {
    it("returns true for defined values", () => {
        expect(isDefined(0)).toBe(true);
        expect(isDefined("")).toBe(true);
        expect(isDefined(false)).toBe(true);
        expect(isDefined([])).toBe(true);
        expect(isDefined({})).toBe(true);
    });

    it("returns false for undefined and null", () => {
        expect(isDefined(undefined)).toBe(false);
        expect(isDefined(null)).toBe(false);
    });
});

describe("prepareFullName", () => {
    it("returns full name for a valid user", () => {
        const user: UserInfo = mockUserInfo();
        expect(prepareFullName(user)).toBe("John Doe");
    });

    it("returns an empty string for null user", () => {
        expect(prepareFullName(null)).toBe("");
    });

    it("returns an empty string for user with missing first name", () => {
        const user: UserInfo = mockUserInfo({ firstName: "", lastName: "Doe" });
        expect(prepareFullName(user)).toBe(" Doe");
    });

    it("returns an empty string for user with missing last name", () => {
        const user: UserInfo = mockUserInfo({ firstName: "Joe", lastName: "" });
        expect(prepareFullName(user)).toBe("Joe ");
    });

    it("returns an empty string for user with missing first and last name", () => {
        const user: UserInfo = mockUserInfo({ firstName: "", lastName: "" });
        expect(prepareFullName(user)).toBe(" ");
    });
});
