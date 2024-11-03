import React from "react";

export interface ThemeContextType {
    isLightTheme: boolean;
    toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    isLightTheme: true,
    toggleTheme: () => {},
});

export default ThemeContext;
