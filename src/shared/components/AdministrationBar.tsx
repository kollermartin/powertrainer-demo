import { Button, Col, Input, Row, Space, Typography } from "antd";

interface AdministrationBarProps {
    onButtonClick: () => void;
    buttonText: string;
    title: string;
    showSearch?: boolean;
    onSearch?: (value: string) => void;
}

const AdministrationBar = ({
    showSearch = true,
    onSearch = () => {},
    onButtonClick,
    buttonText,
    title,
}: AdministrationBarProps) => {
    return (
        <Row justify="space-between" align="middle">
            <Col>
                <Typography.Title level={3}>{title}</Typography.Title>
            </Col>
            <Col>
                <Space>
                    {showSearch && <Input.Search onSearch={onSearch} />}
                    <Button onClick={onButtonClick} type="primary">
                        {buttonText}
                    </Button>
                </Space>
            </Col>
        </Row>
    );
};

export default AdministrationBar;
