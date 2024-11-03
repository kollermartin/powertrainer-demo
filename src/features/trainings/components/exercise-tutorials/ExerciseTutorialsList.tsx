import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExerciseTutorialOverview } from "../../models/exercise-tutorial.model";
import Spinner from "../../../../shared/components/Spinner";
import ResponsiveTableContainer from "../../../../shared/components/ResponsiveTableContainer";
import { HandleSearch } from "../../../../shared/models/tables/handle-operations.model";
import RenderTableFilterDropdown from "../../../../shared/components/TableFilterDropdown";
import { TableData } from "../../../../shared/models/tables/table-data-response.model";

interface ExerciseTutorialsListProps {
    data: TableData<ExerciseTutorialOverview> | undefined;
    handlePageChange: (page: number) => void;
    handleSearch: HandleSearch;
    isLoading: boolean;
    onRowDelete: (id: string) => void;
}

const ExerciseTutorialsList = ({
    data,
    handlePageChange,
    isLoading,
    onRowDelete,
    handleSearch,
}: ExerciseTutorialsListProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
    const navigate = useNavigate();
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedExerciseId("");
    };

    const openDeleteModal = (id: string) => {
        setSelectedExerciseId(id);
        setShowDeleteModal(true);
    };

    const deleteExerciseTutorial = (id: string) => {
        onRowDelete(id);
        closeDeleteModal();
    };

    const columns: TableColumnsType<ExerciseTutorialOverview> = [
        {
            title: t("exerciseTutorialName"),
            key: "name",
            dataIndex: "name",
            filterDropdown: RenderTableFilterDropdown("name", handleSearch),
        },
        {
            title: t("exerciseTutorialType"),
            key: "type",
            dataIndex: "type",
            render: (type) => {
                return <span>{t(`exerciseTutorialType${type}`)}</span>;
            },
        },
        {
            title: t("actions"),
            key: "actions",
            width: 100,
            render: (value: ExerciseTutorialOverview) => {
                return (
                    <div>
                        <Button
                            icon={<EditOutlined />}
                            type="link"
                            onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/trainings/exercises/edit/${value.id}`);
                            }}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            type="link"
                            onClick={(event) => {
                                event.stopPropagation();
                                openDeleteModal(value.id);
                            }}
                        />
                    </div>
                );
            },
        },
    ];
    return (
        <ResponsiveTableContainer>
            <Table
                columns={columns}
                dataSource={data?.items}
                rowKey={(tr) => tr.id}
                loading={{
                    spinning: isLoading,
                    indicator: <Spinner />,
                }}
                pagination={{
                    pageSize: data?.pageSize,
                    total: data?.totalCount,
                    current: data?.page,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: handlePageChange,
                }}
                onRow={(row) => {
                    return {
                        onClick: () => {
                            navigate(`/trainings/exercises/detail/${row.id}`);
                        },
                    };
                }}
            />
            <Modal
                title={t("deleteExerciseTutorial")}
                open={showDeleteModal}
                okText={t("common:deleteOk")}
                okType="danger"
                onCancel={closeDeleteModal}
                cancelText={t("common:no")}
                onOk={() => deleteExerciseTutorial(selectedExerciseId)}
            >
                <p>{t("deleteExerciseTutorialMessage")}</p>
            </Modal>
        </ResponsiveTableContainer>
    );
};

export default ExerciseTutorialsList;
