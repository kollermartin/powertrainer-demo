import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useGetTutorial from "../hooks/useGetTutorial";
import EditTutorialForm, { EditTutorialFormData } from "../components/EditTutorialForm";
import Spinner from "../../../shared/components/Spinner";
import classes from "./EditTutorialPage.module.css";
import useUpdateTutorial from "../hooks/useUpdateTutorial";
import { UpdateTutorialRequest } from "../hooks/Dto";
import ResponsiveContainer from "../../../shared/components/ResponsiveContainer";

const EditTutorialPage = () => {
    const { t } = useTranslation("tutorials");
    const { id } = useParams<string>();
    const { isLoading, isError, data } = useGetTutorial(id);
    const { handleUpdate } = useUpdateTutorial();
    const navigate = useNavigate();

    const handleOnSubmit = (values: EditTutorialFormData) => {
        const request: UpdateTutorialRequest = {
            title: values.title,
            description: values.description,
        };
        handleUpdate(request, id);
        navigate("/tutorials");
    };

    const handleOnCancel = () => {
        navigate("/tutorials");
    };

    if (isError) {
        return <div>Unexpected error</div>;
    }

    return (
        <>
            <Typography.Title className={classes.title}>{t("editTutorial")}</Typography.Title>
            {isLoading && <Spinner />}
            <ResponsiveContainer size="small">
                {data && <EditTutorialForm tutorial={data} onSubmit={handleOnSubmit} onCancel={handleOnCancel} />}
            </ResponsiveContainer>
        </>
    );
};

export default EditTutorialPage;
