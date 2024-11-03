import { Button, Col, Flex, Form, Input, Radio, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IExerciseTutorialForm } from "../../models/forms/exercise-tutorial-form.model";
import { ExerciseTutorial } from "../../models/exercise-tutorial.model";
import { prepareExerciseFormInitialValues } from "../../utils/trainings.utils";
import { MAX_TEXT_AREA_LENGTH } from "../../const/trainings.const";
import { requiredRule, urlRule } from "../../../../shared/rules/form.rules";
import { TutorialDetail } from "../../../tutorials/hooks/Dto";

interface ExerciseTutorialFormProps {
    onSubmit: (values: IExerciseTutorialForm) => void;
    loading: boolean;
    exerciseTutorial?: ExerciseTutorial;
    tutorialData?: TutorialDetail;
}

const ExerciseTutorialForm = ({
    onSubmit,
    loading,
    exerciseTutorial = undefined,
    tutorialData = undefined,
}: ExerciseTutorialFormProps) => {
    const [form] = Form.useForm<IExerciseTutorialForm>();
    const { t } = useTranslation(["trainings", "common"]);
    const isEdit = !!exerciseTutorial;
    const initialValues = prepareExerciseFormInitialValues(exerciseTutorial, tutorialData);

    return (
        <Form
            layout="vertical"
            name="exercise_tutorial_form"
            autoComplete="off"
            form={form}
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <Row>
                <Col xs={24}>
                    <Form.Item<IExerciseTutorialForm>
                        name="name"
                        label={t("exerciseTutorialName")}
                        rules={[requiredRule]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Form.Item<IExerciseTutorialForm>
                        name="type"
                        label={t("exerciseTutorialType")}
                        rules={[requiredRule]}
                    >
                        <Radio.Group>
                            <Radio value={2}>{t("exerciseTutorialType2")}</Radio>
                            <Radio value={0}>{t("exerciseTutorialType0")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={12}>
                    <Form.Item noStyle shouldUpdate={(prev, current) => prev.type !== current.type}>
                        {({ getFieldValue }) => {
                            if (getFieldValue("type") === 2) {
                                return (
                                    <Form.Item<IExerciseTutorialForm>
                                        name="youtubeLink"
                                        label={t("exerciseTutorialYtLink")}
                                        rules={[urlRule, requiredRule]}
                                    >
                                        <Input />
                                    </Form.Item>
                                );
                            }
                            return null;
                        }}
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={24}>
                    <Form.Item<IExerciseTutorialForm> name="description" label={t("exerciseTutorialDescription")}>
                        <TextArea maxLength={MAX_TEXT_AREA_LENGTH} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={24}>
                    <Flex justify="end" gap=".5rem">
                        <Link to="/trainings/administration/exercises">
                            <Button>{t("common:cancel")}</Button>
                        </Link>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {t(isEdit ? "saveExerciseTutorial" : "createExerciseTutorial")}
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </Form>
    );
};

export default ExerciseTutorialForm;
