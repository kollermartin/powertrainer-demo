import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Result } from "antd";
import TrainingsAdministrationList from "../components/trainings-administration/TrainingsAdministrationList";
import useGetAdministrationTrainings from "../hooks/useGetAdministrationTrainings";
import Spinner from "../../../shared/components/Spinner";
import AdministrationBar from "../../../shared/components/AdministrationBar";
import classes from "./AdminTrainingPage.module.css";
import useDeleteTraining from "../hooks/useDeleteTraining";

const AdminTrainingPage = () => {
    const { data, isLoading, isError, isRefetching, handleSearch, handlePageChange } = useGetAdministrationTrainings();
    const { handleDelete } = useDeleteTraining();
    const { t } = useTranslation(["trainings", "common"]);
    const navigate = useNavigate();
    const navigateToNewTraining = () => {
        navigate("/trainings/new");
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
                onButtonClick={navigateToNewTraining}
                title={t("administrationTrainings")}
                buttonText={t("newTraining")}
            />
            <TrainingsAdministrationList
                data={data}
                isLoading={isRefetching}
                handlePageChange={handlePageChange}
                onRowDelete={handleDelete}
                handleSearch={handleSearch}
            />
        </div>
    );
};

export default AdminTrainingPage;
