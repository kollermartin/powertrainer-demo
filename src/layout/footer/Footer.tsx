import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import classes from "./Footer.module.css";

const CustomFooter = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <div className={classes.socials}>
                <Button type="link">
                    <FacebookOutlined className={classes.icon} />
                </Button>
                <Button type="link">
                    <InstagramOutlined className={classes.icon} />
                </Button>
                <Button type="link">
                    <YoutubeOutlined className={classes.icon} />
                </Button>
            </div>
            <div className={classes.copyright}>
                <Typography.Text>
                    <span>&copy; {`${dayjs(new Date()).format("YYYY")} ${t("footerCopyright")}`}</span>{" "}
                </Typography.Text>
            </div>
        </>
    );
};

export default CustomFooter;
