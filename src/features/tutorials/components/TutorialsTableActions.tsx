import { Button, Flex, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import classes from "./TutorialsTableActions.module.css";

interface TutorialsTableActionsProps {
    id: string;
    onDelete: (id: string) => void;
    onPlay: (id: string) => void;
    onEdit: (id: string) => void;
}

const TutorialsTableActions = ({ id, onDelete, onPlay, onEdit }: TutorialsTableActionsProps) => {
    const { t } = useTranslation("common");

    return (
        <Flex gap="small">
            <Button type="dashed" onClick={() => onPlay(id)} icon={<PlayCircleOutlined />} />
            <Button type="dashed" onClick={() => onEdit(id)} icon={<EditOutlined />} />
            <Popconfirm
                className={classes.popconfirm}
                title={t("deleteTitle")}
                description={t("deleteMessage", {
                    ns: "common",
                })}
                onConfirm={() => onDelete(id)}
                okText={t("yes")}
                cancelText={t("no")}
            >
                <Button type="dashed" danger icon={<DeleteOutlined />} />
            </Popconfirm>
        </Flex>
    );
};

export default TutorialsTableActions;
