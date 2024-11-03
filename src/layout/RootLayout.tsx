import { Col, Grid, Layout, Row, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import CustomFooter from "./footer/Footer";
import SideNavigation from "./mainNavigation/menu/SideNavigation";
import HorizontalNavigation from "./mainNavigation/menu/headerNavigation/HorizontalNavigation";
import MobileNavigation from "./mainNavigation/menu/headerNavigation/MobileNavigation";
import { SiderWidthCollapsed, SiderWidthExpanded } from "./const/layout.const";

const { Header, Content, Footer, Sider } = Layout;

const RootLayout = () => {
    const {
        token: { colorBgContainer: clr },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    const breakpoint = Grid.useBreakpoint();
    const toggleSidenav = (toggle: boolean) => {
        setCollapsed(toggle);
    };

    const siderDisplayed = breakpoint.lg;

    const getContentMarginLeft = () => {
        if (!siderDisplayed) {
            return undefined;
        }
        return collapsed ? SiderWidthCollapsed : SiderWidthExpanded;
    };

    return (
        <Layout className={classes.layout}>
            {siderDisplayed && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ backgroundColor: clr, overflow: "auto", height: "100vh", position: "fixed" }}
                >
                    <SideNavigation />
                </Sider>
            )}
            <Layout>
                <Header
                    className={classes.header}
                    style={{ backgroundColor: clr, justifyContent: siderDisplayed ? "space-between" : "flex-end" }}
                >
                    {breakpoint.lg ? (
                        <HorizontalNavigation collapsed={collapsed} toggleSideNav={toggleSidenav} />
                    ) : (
                        <MobileNavigation />
                    )}
                </Header>
                {/* There needs to be margin left when sider is visible, because it is fixed and overflows to content */}
                <Content className={classes.content} style={{ marginLeft: getContentMarginLeft() }}>
                    <Row justify="center">
                        {/*  LG={22} because sidebar appears at LG breakpoint and there is less space for content */}
                        <Col xs={22} sm={20} md={18} lg={22} xl={18} xxl={14}>
                            <Outlet />
                        </Col>
                    </Row>
                </Content>
                <Footer className={classes.footer}>
                    <CustomFooter />
                </Footer>
            </Layout>
        </Layout>
    );
};

export default RootLayout;
