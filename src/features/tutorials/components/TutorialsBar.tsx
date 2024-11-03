import { Button, Col, Input, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { MouseEventHandler } from "react";
import classes from "../pages/TutorialsPage.module.css";
import usePermission from "../../../auth/hooks/usePermission";
import PERMISSIONS from "../../../auth/Permissions";
import { HandleSearch } from "../../../shared/models/tables/handle-operations.model";

interface TutorialsBarProps {
    onViewChange: MouseEventHandler<HTMLElement>;
    onSearch: HandleSearch;
}

const TutorialsBar = ({ onViewChange, onSearch }: TutorialsBarProps) => {
    const { t } = useTranslation("tutorials");
    const hasManagePermission = usePermission(PERMISSIONS.MANAGE_TUTORIALS);

    return (
        <Row justify="end" className={classes.marginAll}>
            <Space>
                <Col>
                    <Input.Search
                        placeholder={t("search")}
                        disabled
                        allowClear
                        onSearch={(value: string) => {
                            onSearch({ title: value });
                        }}
                    />
                </Col>
                {hasManagePermission && (
                    <Col>
                        <Button onClick={onViewChange}>{t("changeView")}</Button>
                    </Col>
                )}
            </Space>
        </Row>
    );
};

export default TutorialsBar;
