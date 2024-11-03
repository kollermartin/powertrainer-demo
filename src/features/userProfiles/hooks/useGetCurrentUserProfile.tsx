import { App } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../apiCalls/ApiClient";
import GetProfileResponse from "./GetProfileResponse";
import { USER_PROFILE_PATH } from "../const/user-profiles.const";
import { userProfilesQueryKeys } from "./query-keys";

const fetchCurrentUserProfile = async (signal: AbortSignal | undefined) => {
    const response = await apiClient.get<GetProfileResponse>(`${USER_PROFILE_PATH}/current`, {
        signal,
    });
    return response.data;
};

const useGetCurrentUserProfile = () => {
    const { notification } = App.useApp();
    const { t } = useTranslation("userProfiles");
    const { data, isLoading, isError } = useQuery({
        queryKey: userProfilesQueryKeys.all,
        queryFn: ({ signal }) => fetchCurrentUserProfile(signal),
    });

    if (isError) {
        notification.error({
            message: t("userProfileFetchFailed"),
        });
    }

    return {
        data,
        isLoading,
        isError,
    };
};

export default useGetCurrentUserProfile;
