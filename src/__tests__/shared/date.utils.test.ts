import dayjs from "dayjs";
import toDateString from "../../shared/utils/date.utils";
import REQUEST_DATE_FORMAT from "../../shared/const/date.const";

describe("toDateString", () => {
    it("formats a Date object correctly", () => {
        const date = new Date(2023, 0, 1);
        const result = toDateString(date);
        expect(result).toBe(dayjs(date).format(REQUEST_DATE_FORMAT));
    });

    it("formats a string date correctly", () => {
        const date = "2023-01-01";
        const result = toDateString(date);
        expect(result).toBe(dayjs(date).format(REQUEST_DATE_FORMAT));
    });

    it("formats a dayjs object correctly", () => {
        const date = dayjs("2023-01-01");
        const result = toDateString(date);
        expect(result).toBe(date.format(REQUEST_DATE_FORMAT));
    });

    it("uses the default format if no format is provided", () => {
        const date = "2023-01-01";
        const result = toDateString(date);
        expect(result).toBe(dayjs(date).format(REQUEST_DATE_FORMAT));
    });

    it("uses the provided format if one is given", () => {
        const date = "2023-01-01";
        const customFormat = "YYYY/MM/DD";
        const result = toDateString(date, customFormat);
        expect(result).toBe(dayjs(date).format(customFormat));
    });

    it("handles invalid date input gracefully", () => {
        const date = "invalid-date";
        const result = toDateString(date);
        expect(result).toBe("Invalid Date");
    });
});
