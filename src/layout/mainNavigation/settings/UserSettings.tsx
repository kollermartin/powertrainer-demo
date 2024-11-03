import { Button, Divider, Popover, Space, Switch, Typography } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classes from "./NavigationSettings.module.css";
import LogoutButton from "./LogoutButton";
import LanguageSwitcher from "./LanguageSwitcher";
import navClasses from "../menu/Navigation.module.css";
import ThemeContext from "../../../store/theme/theme-context";

interface UserSettingsProps {
    username: string;
}

const UserSettings = ({ username }: UserSettingsProps) => {
    const { t } = useTranslation("common");
    const themeCtx = useContext(ThemeContext);
    const themeChangeHandler = () => {
        themeCtx.toggleTheme();
    };

    const content = (
        <div className={classes.content}>
            <Link to="/settings/profile">
                <Button type="text" icon={<SettingOutlined />}>
                    {t("settings")}
                </Button>
            </Link>
            <LogoutButton />
            <Divider className={classes.divider} />
            <LanguageSwitcher />
            <Switch
                className={classes.switch}
                checkedChildren={t("lightTheme")}
                unCheckedChildren={t("darkTheme")}
                checked={themeCtx.isLightTheme}
                onChange={themeChangeHandler}
            />
        </div>
    );

    return (
        <Popover content={content} arrow={false} trigger="click" className={classes.settings} placement="bottom">
            <div>
                <Space>
                    <UserOutlined className={navClasses.navigationIcons} />
                    <Typography.Text>{username}</Typography.Text>
                </Space>
            </div>
        </Popover>
    );
};

export default UserSettings;
