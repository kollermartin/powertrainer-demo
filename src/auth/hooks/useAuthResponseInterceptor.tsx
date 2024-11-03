import { useContext, useEffect } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apiClient from "../../apiCalls/ApiClient";
import UserContext from "../../store/user/user-context";
import useRefreshToken from "./useRefreshToken";

const useAuthResponseInterceptor = () => {
    const userCtx = useContext(UserContext);
    const { notification } = App.useApp();
    const navigate = useNavigate();
    const { t } = useTranslation("common");
    const { handleTokenRefresh } = useRefreshToken();

    useEffect(() => {
        const interceptorId = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401) {
                    if (originalRequest.retry && originalRequest.retry === true) {
                        return Promise.reject(error);
                    }

                    try {
                        await handleTokenRefresh();
                    } catch (refreshError) {
                        notification.warning({
                            message: t("sessionExpired"),
                            duration: 0,
                        });

                        userCtx.logout();
                        navigate("/");
                        return Promise.reject(refreshError);
                    }

                    try {
                        originalRequest.retry = true;
                        return await apiClient(originalRequest);
                    } catch (retryError) {
                        return Promise.reject(retryError);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            apiClient.interceptors.response.eject(interceptorId);
        };
    }, [handleTokenRefresh, navigate, notification, t, userCtx]);
};

export default useAuthResponseInterceptor;
