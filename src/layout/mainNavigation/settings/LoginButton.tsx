import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import useLoginUser from "../../../auth/hooks/useLoginUser";

const LoginButton = () => {
    const { t } = useTranslation("common");
    const { handleLogin } = useLoginUser();
    const location = useLocation();
    const handleLoginClick = async () => {
        await handleLogin(location.pathname);
    };

    return (
        <Button type="text" icon={<LoginOutlined />} onClick={handleLoginClick}>
            {t("login")}
        </Button>
    );
};

export default LoginButton;
