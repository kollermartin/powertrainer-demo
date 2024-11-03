import { Menu, MenuProps } from "antd";
import { FireOutlined, FundProjectionScreenOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import classes from "./NavigationMenu.module.css";
import NavigationMode from "./NavigationMode";
import UserContext from "../../../store/user/user-context";
import PERMISSIONS from "../../../auth/Permissions";

interface NavigationMenuProps {
    navigationMode: NavigationMode;
    handleItemClick?: () => void;
}

const menuItems: MenuItemConfig[] = [
    {
        label: "tutorials",
        key: "/tutorials",
        icon: <FundProjectionScreenOutlined />,
        requireAuth: true,
    },
    {
        label: "trainings",
        key: "/trainings",
        icon: <FireOutlined />,
        requireAuth: true,
        permissions: [PERMISSIONS.QUERY_TRAININGS],
        children: [
            {
                label: "administration",
                key: "/trainings/administration",
                permissions: [PERMISSIONS.MANAGE_TRAININGS],
            },
        ],
    },
];

interface MenuItemConfig {
    label: string;
    key: string;
    icon?: JSX.Element;
    requireAuth?: boolean;
    permissions?: string[];
    children?: MenuItemConfig[];
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

const NavigationMenu = ({ navigationMode, handleItemClick = () => {} }: NavigationMenuProps) => {
    const location = useLocation();
    const { t } = useTranslation("common");
    const userCtx = useContext(UserContext);
    const hasPermission = (permissions: string[] | undefined) => {
        if (!permissions) {
            return true;
        }

        return permissions.some((permission) => userCtx.hasPermission(permission));
    };

    const filteredMenuItems: MenuItem[] = menuItems
        .map((menuItem) => {
            if (menuItem.requireAuth && !userCtx.isUserLoggedIn) {
                return null;
            }
            if (!hasPermission(menuItem.permissions)) {
                return null;
            }

            let label: JSX.Element | string = <Link to={menuItem.key}>{t(menuItem.label)}</Link>;

            const children: MenuItem[] | undefined = menuItem.children
                ?.map((child) => {
                    if (!hasPermission(child.permissions)) {
                        return null;
                    }

                    const childLabel = <Link to={child.key}>{t(child.label)}</Link>;

                    return getItem(childLabel, child.key);
                })
                .filter(Boolean) as MenuItem[];

            if (children) {
                label = t(menuItem.label);
            }

            return getItem(label, menuItem.key, menuItem.icon, children);
        })
        .filter(Boolean) as MenuItem[];

    return (
        <Menu
            className={classes.menu}
            mode={navigationMode}
            selectedKeys={[location.pathname]}
            items={filteredMenuItems}
            onClick={handleItemClick}
        />
    );
};

export default NavigationMenu;
