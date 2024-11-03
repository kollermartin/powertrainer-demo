import { Pagination, Result } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../../../shared/components/Spinner";
import classes from "./TutorialsPage.module.css";
import TutorialsBar from "../components/TutorialsBar";
import TutorialsGrid from "../components/TutorialsGrid";
import TutorialsTable from "../components/TutorialsTable";
import useTutorials from "../hooks/useTutorials";

const TutorialsPage = () => {
    const { t } = useTranslation("common");
    const [isGridView, setIsGridView] = useState(true);
    const { data, isLoading, isError, handlePageChange, handleSearch, handleDelete } = useTutorials();
    const handleViewChange = () => {
        setIsGridView((prev) => !prev);
    };

    let content;
    if (data) {
        content = isGridView ? (
            <TutorialsGrid data={data} />
        ) : (
            <TutorialsTable onRowDelete={handleDelete} data={data} />
        );
    }

    return (
        <>
            <TutorialsBar onViewChange={handleViewChange} onSearch={handleSearch} />
            {isError && <Result status="error" title={t("unexpectedError")} />}
            {isLoading && <Spinner />}
            {data && <div className={classes.marginLeftRight}>{content}</div>}
            <Pagination
                className={`${classes.marginAll} ${classes.alignCenter}`}
                defaultCurrent={1}
                total={data?.totalCount}
                pageSize={12}
                onChange={handlePageChange}
            />
        </>
    );
};

export default TutorialsPage;
