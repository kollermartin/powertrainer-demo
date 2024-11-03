import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import module from "./TrainingsForm.module.css";
import TrainingCard from "./TrainingCard";
import { ITrainingsForm } from "../../models/forms/trainings-form.model";
import { MAX_TRAININGS } from "../../const/trainings.const";
import { TrainingDetail } from "../../models/training.model";
import { prepareTrainingsFormInitialValues } from "../../utils/trainings.utils";

interface TrainingsFormProps {
    onSubmit: (values: ITrainingsForm) => void;
    blockSubmitButton: boolean;
    training?: TrainingDetail;
}

const TrainingsForm = ({ training = undefined, onSubmit, blockSubmitButton }: TrainingsFormProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const [form] = Form.useForm<ITrainingsForm>();
    const isEdit = !!training;
    const formInitialValues: ITrainingsForm = prepareTrainingsFormInitialValues(training);

    useEffect(() => {
        // To make sure that form initial values are set after training is loaded and all is rendered correctly
        // Without this there is bug that when you open edit for a second time, autocomplete field is recognized as empty
        // even though it is not visibly empty but error validation is triggered when you try to submit form
        if (isEdit) {
            form.setFieldsValue(prepareTrainingsFormInitialValues(training));
        }
    }, [training, form, isEdit]);

    return (
        <Form
            layout="vertical"
            name="new_training_form"
            autoComplete="off"
            onFinish={onSubmit}
            form={form}
            initialValues={formInitialValues}
        >
            <Form.List name="trainings">
                {(fields, { add, remove }) => (
                    <div className={module.trainingsContainer}>
                        {fields.map((field, index) => (
                            <TrainingCard
                                key={field.key}
                                field={field}
                                index={index}
                                form={form}
                                add={add}
                                remove={remove}
                                disableCopy={fields.length >= MAX_TRAININGS}
                                isEdit={isEdit}
                            />
                        ))}
                        {fields.length < MAX_TRAININGS && !isEdit && (
                            <Button type="dashed" onClick={() => add({ exercises: [{}] })} block>
                                {`+ ${t("addTraining")}`}
                            </Button>
                        )}
                    </div>
                )}
            </Form.List>
            <Row justify="end">
                <Col className={module.formActions}>
                    <Link to="/trainings/administration/trainings">
                        <Button>{t("common:cancel")}</Button>
                    </Link>
                    <Button type="primary" htmlType="submit" loading={blockSubmitButton}>
                        {t(isEdit ? "saveTraining" : "createTraining")}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default TrainingsForm;
