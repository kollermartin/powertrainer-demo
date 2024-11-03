import { Menu, MenuProps } from "antd";
import React from "react";
import { ProfileOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./SettingsMenu.module.css";

const menuItems: MenuItemConfig[] = [
    {
        label: "profile",
        key: "/settings/profile",
        icon: <ProfileOutlined />,
    },
];

interface MenuItemConfig {
    label: string;
    key: string;
    icon: JSX.Element;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const SettingsMenu = () => {
    const location = useLocation();
    const { t } = useTranslation("common");

    const items = menuItems.map((item) => {
        const label = <Link to={item.key}>{t(item.label)}</Link>;
        return getItem(label, item.key, item.icon);
    });

    return (
        <Menu
            mode="inline"
            className={classes.menu}
            items={items}
            selectedKeys={[location.pathname.startsWith("/settings/") ? location.pathname : items[0]!.key!.toString()]}
            defaultValue="/settings/profile"
        />
    );
};

export default SettingsMenu;
