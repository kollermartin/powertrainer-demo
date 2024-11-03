import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import UserTypeCard from "./UserTypeCard";
import trainerImg from "../../../../assets/images/trainer.png";
import athleteImg from "../../../../assets/images/athlete.png";
import classes from "./UserTypeSelection.module.css";
import Role from "../../../../store/user/role";

interface UserTypeSelectionProps {
    onRoleSelected: (userType: Role) => void;
    selectedRole: Role | null;
}

const UserTypeSelection = ({ onRoleSelected, selectedRole }: UserTypeSelectionProps) => {
    const { t } = useTranslation("userProfiles");
    const handleRoleSelected = (role: Role) => {
        onRoleSelected(role);
    };

    return (
        <>
            <Typography.Title className={classes.title} level={2}>
                {t("userTypeSelection")}
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <UserTypeCard
                        imgSrc={athleteImg}
                        title={t("athlete")}
                        info={t("athleteInfo")}
                        selected={selectedRole === Role.Athlete}
                        onClick={() => handleRoleSelected(Role.Athlete)}
                    />
                </Col>
                <Col xs={24} sm={12}>
                    <UserTypeCard
                        imgSrc={trainerImg}
                        title={t("trainer")}
                        info={t("trainerInfo")}
                        selected={selectedRole === Role.Trainer}
                        onClick={() => handleRoleSelected(Role.Trainer)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default UserTypeSelection;
