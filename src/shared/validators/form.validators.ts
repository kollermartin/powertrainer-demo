import { DefaultOptionType } from "antd/lib/select";
import { RuleObject } from "antd/es/form";
import isDefaultOptionType from "../guards/default-option-type.guard";

const selectValueRequired = async (_: RuleObject, value: string | DefaultOptionType) => {
    if (typeof value === "string" && value !== "") {
        return Promise.resolve();
    }

    if (isDefaultOptionType(value)) {
        if (value.value !== "") {
            return Promise.resolve();
        }
        return Promise.reject();
    }
    return Promise.reject();
};

export default selectValueRequired;
