import React from "react";
import ThemeContext, { ThemeContextType } from "./theme-context";

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isLightTheme, setIsLightTheme] = React.useState(true);

    const toggleThemeHandler = React.useCallback(() => {
        setIsLightTheme((prevState) => !prevState);
    }, []);

    const themeContext: ThemeContextType = React.useMemo(
        () => ({
            isLightTheme,
            toggleTheme: toggleThemeHandler,
        }),
        [isLightTheme, toggleThemeHandler],
    );

    React.useEffect(() => {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty(
            "--background-color",
            isLightTheme ? "var(--background-color-light)" : "var(--background-color-dark)",
        );
    }, [isLightTheme]);

    return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
