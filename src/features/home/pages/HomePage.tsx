import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation("common");

    return <Typography.Title>{t("welcome")}</Typography.Title>;
};
export default HomePage;
