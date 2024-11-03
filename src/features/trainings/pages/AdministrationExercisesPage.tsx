import { useTranslation } from "react-i18next";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./AdministrationExercisesPage.module.css";
import AdministrationBar from "../../../shared/components/AdministrationBar";
import Spinner from "../../../shared/components/Spinner";
import ExerciseTutorialsList from "../components/exercise-tutorials/ExerciseTutorialsList";
import useDeleteExerciseTutorial from "../hooks/useDeleteExerciseTutorial";
import useGetExerciseTutorials from "../hooks/useGetExerciseTutorials";

const AdministrationExercisesPage = () => {
    const { data, isLoading, isError, isRefetching, handleSearch, handlePageChange } = useGetExerciseTutorials();
    const { handleDelete } = useDeleteExerciseTutorial();
    const { t } = useTranslation(["trainings", "common"]);
    const navigate = useNavigate();
    const navigateToNewExercise = () => {
        navigate("/trainings/exercises/new");
    };

    if (!data && isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <Result status="error" title={t("common:unexpectedError")} />;
    }

    return (
        <div className={classes.containerContent}>
            <AdministrationBar
                showSearch={false}
                onButtonClick={navigateToNewExercise}
                buttonText={t("newExercise")}
                title={t("administrationExerciseTutorials")}
            />
            <ExerciseTutorialsList
                data={data}
                handleSearch={handleSearch}
                handlePageChange={handlePageChange}
                isLoading={isRefetching}
                onRowDelete={handleDelete}
            />
        </div>
    );
};

export default AdministrationExercisesPage;
