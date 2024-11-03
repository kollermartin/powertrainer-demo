import React from "react";
import { theme } from "antd";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}
const Container = ({ children, className = "" }: ContainerProps) => {
    const {
        token: { colorBgContainer: clr },
    } = theme.useToken();

    return (
        <div style={{ backgroundColor: clr }} className={className}>
            {children}
        </div>
    );
};

export default Container;
