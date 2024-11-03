import { Location } from "react-router-dom";
import {
    addParamsFromLocationToUrl,
    findLocationParam,
    prepareNavigationToLocation,
    prepareRedirectUrlFromLocation,
} from "../../shared/utils/redirect.utils";

describe("prepareRedirectUrlFromLocation", () => {
    it("returns pathname when search is empty", () => {
        const location: Location = { pathname: "/home", search: "", state: null, hash: "", key: "" };
        expect(prepareRedirectUrlFromLocation(location)).toBe("/home");
    });

    it("returns pathname with search when search is present", () => {
        const location: Location = { pathname: "/home", search: "?query=test", state: null, hash: "", key: "" };
        expect(prepareRedirectUrlFromLocation(location)).toBe("/home?query=test");
    });
});

describe("addParamsFromLocationToUrl", () => {
    it("appends search and location to url when pathname is different", () => {
        const location: Location = { pathname: "/home", search: "?query=test", state: null, hash: "", key: "" };
        expect(addParamsFromLocationToUrl("/other", location)).toBe("/other?query=test&location=/home");
    });

    // it("appends search to url when url is base route", () => {
    //   const location: Location = { pathname: "/home", search: "?query=test", state: null, hash: "", key: "" };
    //   expect(addParamsFromLocationToUrl("/", location)).toBe("/home?query=test");
    // });

    it("returns url when search and pathname are empty", () => {
        const location: Location = { pathname: "", search: "", state: null, hash: "", key: "" };
        expect(addParamsFromLocationToUrl("/home", location)).toBe("/home");
    });
});

describe("findLocationParam", () => {
    it("returns location param when present", () => {
        const location: Location = {
            pathname: "/home",
            search: "?location=/dashboard",
            state: null,
            hash: "",
            key: "",
        };
        expect(findLocationParam(location)).toBe("/dashboard");
    });

    it("returns null when location param is not present", () => {
        const location: Location = { pathname: "/home", search: "?query=test", state: null, hash: "", key: "" };
        expect(findLocationParam(location)).toBeNull();
    });
});

describe("prepareNavigationToLocation", () => {
    it("returns location query without location param", () => {
        const location: Location = {
            pathname: "/home",
            search: "?location=/dashboard&query=test",
            state: null,
            hash: "",
            key: "",
        };
        expect(prepareNavigationToLocation(location)).toBe("/dashboard?query=test");
    });

    it("returns root when location param is not present", () => {
        const location: Location = { pathname: "/home", search: "?query=test", state: null, hash: "", key: "" };
        expect(prepareNavigationToLocation(location)).toBe("/");
    });
});
