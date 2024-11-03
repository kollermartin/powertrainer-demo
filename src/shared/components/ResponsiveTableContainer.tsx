import React from "react";
import classes from "./ResponsiveTableContainer.module.css";

interface ResponsiveTableContainerProps {
    children: React.ReactNode;
}

const ResponsiveTableContainer = ({ children }: ResponsiveTableContainerProps) => {
    return <div className={classes.responsiveTableContainer}>{children}</div>;
};

export default ResponsiveTableContainer;
