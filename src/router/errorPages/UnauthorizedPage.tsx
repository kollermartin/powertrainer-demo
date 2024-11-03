import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    const { t } = useTranslation("common");

    return (
        <Result
            status="403"
            title="403"
            subTitle={t("unauthorized")}
            extra={
                <Link to="/">
                    <Button type="primary">{t("backHome")}</Button>
                </Link>
            }
        />
    );
};

export default UnauthorizedPage;
