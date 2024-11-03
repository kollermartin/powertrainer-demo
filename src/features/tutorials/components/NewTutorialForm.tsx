import { useState } from "react";
import { Button, Col, Form, Input, Row, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import classes from "../pages/NewTutorialPage.module.css";
import RichEditor from "../../editor/RichEditor";
import { fileSizeValidator, fileTypeValidator } from "../../../shared/validators/file.validators";
import { normFile } from "../../../shared/const/file.const";

export interface NewTutorialFormData {
    title: string;
    description: string;
    upload: UploadFile[];
}

interface NewTutorialFormProps {
    onSubmit: (values: NewTutorialFormData) => void;
    blockSubmit: boolean;
}

const NewTutorialForm = ({ onSubmit, blockSubmit }: NewTutorialFormProps) => {
    const { t } = useTranslation("common");
    const [editorValue, setEditorValue] = useState("");

    return (
        <Form name="basic" layout="vertical" onFinish={onSubmit} autoComplete="off">
            <Row>
                <Col xs={{ span: 24 }} md={{ span: 15 }}>
                    <Form.Item<NewTutorialFormData>
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
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8, offset: 1 }}>
                    <Form.Item<NewTutorialFormData>
                        label={t("video")}
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: t("videoRequired"),
                            },
                            {
                                validator: fileSizeValidator,
                                message: t("fileSize100MB"),
                            },
                            {
                                validator: fileTypeValidator,
                                message: t("unsupportedFileType"),
                            },
                        ]}
                    >
                        <Upload maxCount={1} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>{t("clickToUpload")}</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item<NewTutorialFormData>
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
                <Button loading={blockSubmit} type="primary" htmlType="submit">
                    {t("submit")}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewTutorialForm;
