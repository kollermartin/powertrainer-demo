import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    const { t } = useTranslation("common");

    return (
        <Result
            status="404"
            title="404"
            subTitle={t("notFound")}
            extra={
                <Link to="/">
                    <Button type="primary">{t("backHome")}</Button>
                </Link>
            }
        />
    );
};

export default NotFoundPage;
