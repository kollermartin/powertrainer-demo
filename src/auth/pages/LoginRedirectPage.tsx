import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App } from "antd";
import { useTranslation } from "react-i18next";
import useGetUserInfo from "../hooks/useGetUserInfo";
import UserContext from "../../store/user/user-context";
import Spinner from "../../shared/components/Spinner";
import { findLocationParam, prepareNavigationToLocation } from "../../shared/utils/redirect.utils";

const LoginRedirectPage = () => {
    const { notification } = App.useApp();
    const { t } = useTranslation("common");
    const { data, isError } = useGetUserInfo();
    const userCtx = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const redirectUrl = query.get("redirectUrl");

    useEffect(() => {
        if (isError) {
            notification.error({
                message: t("unableToLogin"),
            });
            return;
        }

        if (data) {
            userCtx.setUser(data);
            if (redirectUrl) {
                navigate(redirectUrl);
            } else if (findLocationParam(location)) {
                navigate(prepareNavigationToLocation(location), { replace: true });
            } else {
                navigate("/");
            }
        }
    }, [data, isError, navigate, notification, redirectUrl, t, userCtx]);

    return <Spinner />;
};

export default LoginRedirectPage;
