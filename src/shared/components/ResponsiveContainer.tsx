import React from "react";
import { Col, Row } from "antd";

type ResponsiveContainerSize = "small" | "medium" | "large";

interface ResponsiveContainerProps {
    children: React.ReactNode;
    size?: ResponsiveContainerSize;
}

const ResponsiveContainer = ({ children, size = "large" }: ResponsiveContainerProps) => {
    let breakpoints;

    switch (size) {
        case "small":
            breakpoints = {
                xs: { span: 24 },
                sm: { span: 22 },
                lg: { span: 16 },
                xl: { span: 14 },
                xxl: { span: 12 },
            };
            break;
        case "medium":
            breakpoints = { xs: { span: 24 }, sm: { span: 22 }, lg: { span: 16 } };
            break;
        case "large":
        default:
            breakpoints = { xs: { span: 24 } };
            break;
    }

    return (
        <Row justify="center">
            <Col xs={breakpoints.xs} sm={breakpoints.sm} lg={breakpoints.lg} xl={breakpoints.xl} xxl={breakpoints.xxl}>
                {children}
            </Col>
        </Row>
    );
};

export default ResponsiveContainer;
