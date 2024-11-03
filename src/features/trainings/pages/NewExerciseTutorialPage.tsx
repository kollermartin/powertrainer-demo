import { Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseTutorialForm from "../components/exercise-tutorials/ExerciseTutorialForm";
import useCreateExerciseTutorial from "../hooks/useCreateExerciseTutorial";
import { IExerciseTutorialForm } from "../models/forms/exercise-tutorial-form.model";
import { prepareExerciseTutorialRequest } from "../utils/trainings.utils";
import ResponsiveContainer from "../../../shared/components/ResponsiveContainer";

const NewExerciseTutorialPage = () => {
    const { t } = useTranslation("trainings");
    const { handleCreate } = useCreateExerciseTutorial();
    const navigate = useNavigate();

    const [blockSubmitButton, setBlockSubmitButton] = useState(false);

    const onSubmit = async (values: IExerciseTutorialForm) => {
        setBlockSubmitButton(true);

        const request = prepareExerciseTutorialRequest(values);

        await handleCreate(request)
            .then(() => {
                navigate("/trainings/administration/exercises");
            })
            .finally(() => {
                setBlockSubmitButton(false);
            });
    };

    return (
        <>
            <Row justify="center">
                <Typography.Title>{t("newExercise")}</Typography.Title>
            </Row>
            <ResponsiveContainer size="small">
                <ExerciseTutorialForm onSubmit={onSubmit} loading={blockSubmitButton} />
            </ResponsiveContainer>
        </>
    );
};

export default NewExerciseTutorialPage;
