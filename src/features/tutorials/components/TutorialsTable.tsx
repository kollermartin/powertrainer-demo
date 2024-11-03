import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Table, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tutorial, Tutorials } from "../hooks/Dto";
import TutorialsTableActions from "./TutorialsTableActions";
import VideoPlayerModal from "../../videos/components/videoPlayer/VideoPlayerModal";
import useGetTutorialStream from "../hooks/useGetTutorialStream";

interface TutorialsTableProps {
    data: Tutorials;
    onRowDelete: (id: string) => void;
}

const TutorialsTable = ({ data, onRowDelete }: TutorialsTableProps) => {
    const { t } = useTranslation("tutorials");
    const [open, setOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(undefined);
    const { streamLink, isLoading, isError, shouldLoadVideo, handleShouldLoadVideo } =
        useGetTutorialStream(selectedVideoId);
    const navigate = useNavigate();

    const handleVideoPlay = (id: string) => {
        setSelectedVideoId(id);
        setOpen(true);
    };

    const handleVideoClose = () => {
        setSelectedVideoId(undefined);
        setOpen(false);
    };

    const handleEdit = (id: string) => {
        navigate(`/tutorials/${id}/edit`);
    };

    const columns: ColumnsType<Tutorial> = [
        {
            title: t("title"),
            key: "title",
            dataIndex: "title",
            render: (_, { title, id }) => {
                return <Link to={`/tutorials/${id}`}>{title}</Link>;
            },
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => {
                return <Typography.Text>{t(`tutorial.status${status}`)}</Typography.Text>;
            },
        },
        {
            title: t("actions"),
            key: "actions",
            dataIndex: "actions",
            render: (_, { id }) => {
                return (
                    <TutorialsTableActions
                        id={id}
                        onDelete={onRowDelete}
                        onPlay={handleVideoPlay}
                        onEdit={handleEdit}
                    />
                );
            },
        },
    ];
    return (
        <>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data.items}
                scroll={{ x: "max-content" }}
                rowKey={(tutorial) => tutorial.id}
            />
            {selectedVideoId && (
                <VideoPlayerModal
                    streamLink={streamLink}
                    isError={isError}
                    isLoading={isLoading}
                    handleShouldLoadVideo={handleShouldLoadVideo}
                    shouldLoadVideo={shouldLoadVideo}
                    open={open}
                    onOk={handleVideoClose}
                />
            )}
        </>
    );
};

export default TutorialsTable;
