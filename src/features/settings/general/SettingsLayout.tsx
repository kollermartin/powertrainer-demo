import { Grid, Layout, theme, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsMenu from "./SettingsMenu";
import classes from "./SettingsLayout.module.css";

const SettingsLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { t } = useTranslation("common");
    const breakpoint = Grid.useBreakpoint();

    return (
        <>
            <Typography.Title level={2} className={classes.title}>
                {t("settings")}
            </Typography.Title>

            <Layout
                className={classes.layout}
                style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Layout.Sider
                    style={{
                        background: colorBgContainer,
                    }}
                    collapsed={!breakpoint.lg}
                >
                    <SettingsMenu />
                </Layout.Sider>
                <Layout.Content className={classes.layoutContent}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </>
    );
};

export default SettingsLayout;
