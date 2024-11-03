import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import TrainingsForm from "../components/forms/TrainingsForm";
import { ITrainingsForm } from "../models/forms/trainings-form.model";
import { trainingsFormToCreateTrainingRequest } from "../utils/trainings.utils";
import useCreateTraining from "../hooks/useCreateTraining";

const NewTrainingPage = () => {
    const { t } = useTranslation("trainings");
    const { handleCreate } = useCreateTraining();
    const navigate = useNavigate();
    const [blockSubmitButton, setBlockSubmitButton] = useState(false);

    const onSubmit = async (trainingValues: ITrainingsForm) => {
        setBlockSubmitButton(true);
        const requests = trainingsFormToCreateTrainingRequest(trainingValues);

        await handleCreate(requests)
            .then(() => {
                navigate("/trainings/administration/trainings");
            })
            .finally(() => {
                setBlockSubmitButton(false);
            });
    };

    return (
        <div>
            <Row justify="center">
                <Typography.Title>{t("newTraining")}</Typography.Title>
            </Row>
            <TrainingsForm blockSubmitButton={blockSubmitButton} onSubmit={onSubmit} />
        </div>
    );
};

export default NewTrainingPage;
