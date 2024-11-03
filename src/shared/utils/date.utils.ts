import dayjs from "dayjs";
import REQUEST_DATE_FORMAT from "../const/date.const";

const toDateString = (date: Date | string | dayjs.Dayjs, format = REQUEST_DATE_FORMAT): string => {
    return dayjs(date).format(format);
};

export default toDateString;
