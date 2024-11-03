import { Button, Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { MouseEventHandler, useState } from "react";
import RichEditor from "../../editor/RichEditor";
import { TutorialDetail } from "../hooks/Dto";
import classes from "./EditTutorialForm.module.css";

export interface EditTutorialFormData {
    title: string;
    description: string;
}

interface EditTutorialFormProps {
    tutorial: TutorialDetail;
    onSubmit: (values: EditTutorialFormData) => void;
    onCancel: MouseEventHandler<HTMLElement>;
}

const EditTutorialForm = ({ tutorial, onSubmit, onCancel }: EditTutorialFormProps) => {
    const { t } = useTranslation("common");
    const [editorValue, setEditorValue] = useState(tutorial.description);

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{
                title: tutorial.title,
                description: tutorial.description,
            }}
            onFinish={onSubmit}
            autoComplete="off"
        >
            <Form.Item<EditTutorialFormData>
                name="title"
                label={t("title")}
                rules={[
                    {
                        required: true,
                        message: t("titleRequired"),
                        max: 255,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item<EditTutorialFormData>
                name="description"
                label={t("description")}
                rules={[
                    {
                        required: true,
                        message: t("descriptionRequired"),
                        max: 1000,
                    },
                ]}
            >
                <RichEditor readonly={false} value={editorValue} onChange={setEditorValue} />
            </Form.Item>
            <Form.Item className={classes.submit}>
                <Flex gap="middle" justify="flex-end">
                    <Button type="primary" danger htmlType="button" onClick={onCancel}>
                        {t("cancel")}
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {t("submit")}
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    );
};

export default EditTutorialForm;
