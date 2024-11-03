import { App } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { userInfoQueryKeys } from "./query-keys";
import UserInfo from "../../store/user/UserInfo";
import PERMISSIONS from "../Permissions";
import Role from "../../store/user/role";

const getUserInfo = async () => {
    const data: UserInfo = {
        firstName: "Joe",
        lastName: "Doe",
        email: "joe.doe@foo.cz",
        permissions: Object.values(PERMISSIONS),
        id: "123",
        role: Role.Trainer,
    };

    return Promise.resolve(data);
};

const useGetUserInfo = () => {
    const { notification } = App.useApp();
    const { t } = useTranslation("common");
    const { data, isLoading, isError } = useQuery({
        queryKey: userInfoQueryKeys.all,
        queryFn: getUserInfo,
    });

    if (isError) {
        notification.error({
            message: t("userInfoFailed"),
        });
    }

    return {
        data,
        isLoading,
        isError,
    };
};

export default useGetUserInfo;
