import { App, ConfigProvider, theme } from "antd";
import { useContext } from "react";
import AppRouter from "./router/AppRouter";
import ThemeContext from "./store/theme/theme-context";
import classes from "./MainApp.module.css";
import defaultNotificationConfig from "./configs/notification.config";

const MainApp = () => {
    const themeCtx = useContext(ThemeContext);

    return (
        <ConfigProvider
            theme={{
                algorithm: themeCtx.isLightTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
            }}
        >
            <App
                className={classes.mainApp}
                notification={{
                    ...defaultNotificationConfig,
                }}
            >
                <AppRouter />
            </App>
        </ConfigProvider>
    );
};

export default MainApp;
