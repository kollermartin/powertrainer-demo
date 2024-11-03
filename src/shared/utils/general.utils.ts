import UserInfo from "../../store/user/UserInfo";

export const isDefined = (value: unknown) => value !== undefined && value !== null;

export const prepareFullName = (user: UserInfo | null) => {
    if (!user) {
        return "";
    }

    return `${user.firstName} ${user.lastName}`;
};
