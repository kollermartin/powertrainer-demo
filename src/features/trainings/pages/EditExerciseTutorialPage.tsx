import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Result, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import useGetExerciseTutorial from "../hooks/useGetExerciseTutorial";
import Spinner from "../../../shared/components/Spinner";
import ExerciseTutorialForm from "../components/exercise-tutorials/ExerciseTutorialForm";
import { IExerciseTutorialForm } from "../models/forms/exercise-tutorial-form.model";
import useUpdateExerciseTutorial from "../hooks/useUpdateExerciseTutorial";
import { prepareExerciseTutorialRequest } from "../utils/trainings.utils";
import ResponsiveContainer from "../../../shared/components/ResponsiveContainer";
import useGetTutorial from "../../tutorials/hooks/useGetTutorial";
import ExerciseTutorialType from "../enums/exercise-tutorial-type.enum";

const EditExerciseTutorialPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation("trainings");
    const { data, isLoading, isError } = useGetExerciseTutorial(id);
    const { handleUpdate } = useUpdateExerciseTutorial();
    const navigate = useNavigate();
    const [blockSubmit, setBlockSubmit] = useState(false);
    const [enableFetchTutorial, setEnableFetchTutorial] = useState(false);

    const {
        data: tutorial,
        isLoading: tutorialIsLoading,
        isError: tutorialIsError,
    } = useGetTutorial(data?.source, enableFetchTutorial);

    useEffect(() => {
        if (data && data?.type === ExerciseTutorialType.POWERTRAINER) {
            setEnableFetchTutorial(true);
        }
    }, [data]);

    const onSubmit = (values: IExerciseTutorialForm) => {
        if (!data) {
            return;
        }

        const request = prepareExerciseTutorialRequest(values);

        setBlockSubmit(true);

        handleUpdate(request, data.id)
            .then(() => {
                setBlockSubmit(false);
                navigate("/trainings/administration/exercises");
            })
            .finally(() => {
                setBlockSubmit(false);
            });
    };

    if (isLoading || (data?.type === ExerciseTutorialType.POWERTRAINER && tutorialIsLoading)) {
        return <Spinner />;
    }

    if (isError || !data) {
        return <Result status="error" title={t("noExerciseTutorialFound")} />;
    }

    if (data.type === ExerciseTutorialType.POWERTRAINER && (tutorialIsError || !tutorial)) {
        return <Result status="error" title={t("powertrainerTutorialFetchFailed")} />;
    }

    return (
        <>
            <Row justify="center">
                <Typography.Title>{t("editExerciseTutorial")}</Typography.Title>
            </Row>
            <ResponsiveContainer size="small">
                <ExerciseTutorialForm
                    onSubmit={onSubmit}
                    loading={blockSubmit}
                    exerciseTutorial={data}
                    tutorialData={tutorial}
                />
            </ResponsiveContainer>
        </>
    );
};

export default EditExerciseTutorialPage;
