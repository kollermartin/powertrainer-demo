import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import NavigationSettings from "../../settings/NavigationSettings";
import { SiderWidthCollapsed, SiderWidthExpanded } from "../../../const/layout.const";

interface HorizontalNavigationProps {
    collapsed: boolean;
    toggleSideNav: (val: boolean) => void;
}

const HorizontalNavigation = ({ collapsed, toggleSideNav }: HorizontalNavigationProps) => {
    return (
        <>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => toggleSideNav(!collapsed)}
                style={{
                    fontSize: "40px",
                    width: 64,
                    height: 64,
                    marginLeft: collapsed ? SiderWidthCollapsed : SiderWidthExpanded,
                }}
            />
            <NavigationSettings />
        </>
    );
};

export default HorizontalNavigation;
