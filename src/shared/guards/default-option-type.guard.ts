import { DefaultOptionType } from "antd/lib/select";

const isDefaultOptionType = (value: unknown): value is DefaultOptionType => {
    return (value as DefaultOptionType).value !== undefined && (value as DefaultOptionType).label !== undefined;
};

export default isDefaultOptionType;
