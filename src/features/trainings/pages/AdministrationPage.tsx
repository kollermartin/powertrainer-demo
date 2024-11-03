import { Card, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import PERMISSIONS from "../../../auth/Permissions";
import UserContext from "../../../store/user/user-context";

const AdministrationPage = () => {
    const { t } = useTranslation("trainings");
    const userContext = useContext(UserContext);
    const data = [
        {
            title: t("administrationTrainings"),
            description: t("administrationTrainingsDescription"),
            hasPermission: userContext.hasPermission(PERMISSIONS.MANAGE_TRAININGS),
            path: "/trainings/administration/trainings",
        },
        {
            title: t("administrationExerciseTutorials"),
            description: t("administrationExerciseTutorialsDescription"),
            hasPermission: userContext.hasPermission(PERMISSIONS.MANAGE_EXERCISE_TUTORIALS),
            path: "/trainings/administration/exercises",
        },
    ];
    return (
        <div>
            <Row justify="center">
                <Typography.Title level={1}>{t("administration")}</Typography.Title>
            </Row>
            <Row justify="center" gutter={[16, 16]}>
                {data.map((item) => {
                    if (item.hasPermission) {
                        return (
                            <Col key={item.title} xs={24} md={12}>
                                <Link to={item.path}>
                                    <Card actions={[<ArrowRightOutlined />]} hoverable title={item.title}>
                                        <span>{item.description}</span>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    }
                    return null;
                })}
            </Row>
        </div>
    );
};

export default AdministrationPage;
