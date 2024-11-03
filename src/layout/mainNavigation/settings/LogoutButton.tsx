import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import useLogoutUser from "../../../auth/hooks/useLogoutUser";

const LogoutButton = () => {
    const { t } = useTranslation("common");
    const { handleLogout, isError } = useLogoutUser();

    if (isError) {
        return null;
    }

    return (
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            {t("logout")}
        </Button>
    );
};

export default LogoutButton;
