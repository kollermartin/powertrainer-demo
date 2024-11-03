import { useState } from "react";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { AdministrationTraining } from "../../models/training.model";
import Spinner from "../../../../shared/components/Spinner";
import ResponsiveTableContainer from "../../../../shared/components/ResponsiveTableContainer";
import { HandleSearch } from "../../../../shared/models/tables/handle-operations.model";
import RenderTableFilterDropdown from "../../../../shared/components/TableFilterDropdown";
import { TableData } from "../../../../shared/models/tables/table-data-response.model";

interface TrainingsAdministrationListProps {
    data: TableData<AdministrationTraining> | undefined;
    handlePageChange: (page: number, pageSize: number) => void;
    isLoading: boolean;
    onRowDelete: (id: string) => void;
    handleSearch: HandleSearch;
}

const TrainingsAdministrationList = ({
    data,
    handlePageChange,
    isLoading,
    onRowDelete,
    handleSearch,
}: TrainingsAdministrationListProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTrainingId, setSelectedTrainingId] = useState<string>("");

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedTrainingId("");
    };

    const openDeleteModal = (id: string) => {
        setSelectedTrainingId(id);
        setShowDeleteModal(true);
    };

    const deleteTraining = (id: string) => {
        onRowDelete(id);
        closeDeleteModal();
    };

    const columns: TableColumnsType<AdministrationTraining> = [
        {
            title: t("trainingName"),
            key: "name",
            dataIndex: "name",
            filterDropdown: RenderTableFilterDropdown("name", handleSearch),
        },
        {
            title: t("trainingAssignee"),
            key: "assignee",
            dataIndex: "assigneeName",
            filterDropdown: RenderTableFilterDropdown("assigneeName", handleSearch),
        },
        {
            title: t("scheduledDate"),
            key: "scheduledDate",
            dataIndex: "scheduledDate",
            render: (date) => {
                return <span>{dayjs(date).format("DD/MM/YYYY")}</span>;
            },
        },
        {
            title: t("createdDate"),
            key: "createdDate",
            dataIndex: "createdOnUtc",
            render: (date) => {
                return <span>{dayjs(date).format("DD/MM/YYYY")}</span>;
            },
        },
        {
            title: t("actions"),
            key: "actions",
            width: 100,
            render: (value: AdministrationTraining) => {
                return (
                    <div>
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
                scroll={{ x: "fit-content" }}
                loading={{
                    spinning: isLoading,
                    indicator: <Spinner />,
                }}
                pagination={{
                    pageSize: 10,
                    total: data?.totalCount,
                    defaultCurrent: 1,
                    onChange: handlePageChange,
                    current: data?.page,
                    showSizeChanger: false,
                }}
            />
            <Modal
                title={t("deleteTraining")}
                open={showDeleteModal}
                okText={t("common:deleteOk")}
                okType="danger"
                onCancel={closeDeleteModal}
                cancelText={t("common:no")}
                onOk={() => deleteTraining(selectedTrainingId)}
            >
                <p>{t("deleteTrainingMessage")}</p>
            </Modal>
        </ResponsiveTableContainer>
    );
};

export default TrainingsAdministrationList;
