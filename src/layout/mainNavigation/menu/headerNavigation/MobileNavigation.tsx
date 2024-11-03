import { Button, Divider, Drawer } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import NavigationLogo from "../../logo/NavigationLogo";
import NavigationMenu from "../NavigationMenu";
import NavigationSettings from "../../settings/NavigationSettings";
import navClasses from "../Navigation.module.css";
import classes from "../VerticalNavigation.module.css";
import NavigationMode from "../NavigationMode";

const MobileNavigation = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation("common");

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="text" onClick={showDrawer}>
                <MenuOutlined className={navClasses.navigationIcons} />
            </Button>
            <Drawer title={t("navigation")} placement="right" onClose={onClose} open={open}>
                <NavigationLogo />
                <div className={classes.settings}>
                    <NavigationSettings />
                    <Divider />
                </div>
                <NavigationMenu navigationMode={NavigationMode.INLINE} handleItemClick={onClose} />
            </Drawer>
        </>
    );
};

export default MobileNavigation;
