import i18n from "i18next";
import { Rule } from "antd/lib/form";

export const requiredRule = {
    required: true,
    message: i18n.t("fieldIsRequired", { ns: "common" }),
};

export const urlRule: Rule = {
    type: "url",
    message: i18n.t("invalidUrl", { ns: "common" }),
};

export const emailRule: Rule = {
    type: "email",
    message: i18n.t("invalidEmail", { ns: "common" }),
};
