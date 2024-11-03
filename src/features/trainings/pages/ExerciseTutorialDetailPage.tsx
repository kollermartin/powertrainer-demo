import { useParams } from "react-router-dom";
import { Result } from "antd";
import { useTranslation } from "react-i18next";
import Spinner from "../../../shared/components/Spinner";
import useGetExerciseTutorial from "../hooks/useGetExerciseTutorial";
import ExerciseTutorialDetail from "../components/exercise-tutorials/ExerciseTutorialDetail";

const ExerciseTutorialDetailPage = () => {
    const { id } = useParams<string>();
    const { t } = useTranslation("trainings");

    const { data, isLoading, isError } = useGetExerciseTutorial(id);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !data) {
        return <Result status="error" title={t("noExerciseTutorial")} />;
    }

    return <ExerciseTutorialDetail data={data} />;
};

export default ExerciseTutorialDetailPage;
