import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    FormInstance,
    FormListFieldData,
    FormListOperation,
    Input,
    Row,
    Select,
    Typography,
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { CloseOutlined, CopyOutlined } from "@ant-design/icons";
import module from "./TrainingsForm.module.css";
import MeasurementUnit from "../../enums/measurement-unit.enum";
import ExerciseItem from "./ExerciseItem";
import { ITrainingsForm } from "../../models/forms/trainings-form.model";
import { MAX_EXERCISES, SCHEDULED_DATE_DISPLAY_FORMAT } from "../../const/trainings.const";
import { requiredRule } from "../../../../shared/rules/form.rules";
import useGetTrainerGroupMembersAutocomplete from "../../../../shared/hooks/useGetTrainerGroupMembersAutocomplete";
import selectValueRequired from "../../../../shared/validators/form.validators";

interface TrainingCardProps {
    field: FormListFieldData;
    index: number;
    form: FormInstance<ITrainingsForm>;
    add: FormListOperation["add"];
    remove: FormListOperation["remove"];
    disableCopy: boolean;
    isEdit: boolean;
}

const TrainingCard = ({ field, index, form, add, remove, disableCopy, isEdit }: TrainingCardProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const gutter = { xs: 8, sm: 10, md: 12 };
    const trainingsLength = form.getFieldValue("trainings").length;
    const { data, isLoading, handleSearch } = useGetTrainerGroupMembersAutocomplete();

    const handleCopyTraining = () => {
        const trainingFieldValue: ITrainingsForm["trainings"][number] = {
            ...form.getFieldValue(["trainings", field.name]),
        };

        trainingFieldValue.name = `${t("trainingCopy", {
            value: trainingFieldValue.name,
        })}`;

        add(trainingFieldValue, index + 1);
    };

    return (
        <Card
            title={`${t("training")} ${index + 1}`}
            extra={
                <div className={module.trainingActions}>
                    {!disableCopy && !isEdit && <CopyOutlined onClick={handleCopyTraining} />}
                    {!isEdit && trainingsLength > 1 && (
                        <CloseOutlined
                            onClick={() => {
                                remove(field.name);
                            }}
                        />
                    )}
                </div>
            }
        >
            <Row gutter={gutter}>
                <Col xs={24} md={12} lg={{ span: 11, offset: 1 }}>
                    <Form.Item<ITrainingsForm["trainings"]>
                        label={t("trainingName")}
                        name={[field.name, "name"]}
                        rules={[requiredRule]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={10}>
                    <Form.Item<ITrainingsForm["trainings"]>
                        label={t("trainingAssignee")}
                        name={[field.name, "assigneeId"]}
                        rules={[
                            {
                                validator: selectValueRequired,
                                message: t("selectAssignee"),
                            },
                        ]}
                    >
                        <Select
                            loading={isLoading}
                            labelInValue
                            showSearch
                            options={data}
                            filterOption={false}
                            allowClear
                            notFoundContent={<span>{t("assigneeNotFound")}</span>}
                            onSearch={handleSearch}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={{ span: 9, offset: 1 }}>
                    <Form.Item<ITrainingsForm["trainings"]>
                        label={t("trainingScheduledDate")}
                        name={[field.name, "scheduledDate"]}
                        rules={[requiredRule]}
                    >
                        <DatePicker
                            format={SCHEDULED_DATE_DISPLAY_FORMAT}
                            minDate={dayjs(new Date())}
                            placeholder={t("trainingPickScheduledDate")}
                            className={module.datePicker}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item<ITrainingsForm["trainings"]>>
                <Row>
                    <Col xs={24} lg={{ span: 22, offset: 1 }}>
                        <Typography.Title level={5}>{t("exercises")}</Typography.Title>
                    </Col>
                </Row>
                <Form.List name={[field.name, "exercises"]}>
                    {(exerciseFields, exerciseOpts) => (
                        <div>
                            {exerciseFields.map((exerciseField, exerciseIndex) => (
                                <ExerciseItem
                                    key={exerciseField.key}
                                    parentField={field}
                                    exerciseField={exerciseField}
                                    fieldsLength={exerciseFields.length}
                                    index={exerciseIndex}
                                    form={form}
                                    add={exerciseOpts.add}
                                    remove={exerciseOpts.remove}
                                    disableCopy={exerciseFields.length >= MAX_EXERCISES}
                                />
                            ))}
                            <Row className={module.addExercise}>
                                <Col
                                    xs={24}
                                    lg={{
                                        span: 21,
                                        offset: 1,
                                    }}
                                >
                                    {exerciseFields.length < MAX_EXERCISES && (
                                        <Button
                                            type="dashed"
                                            onClick={() =>
                                                exerciseOpts.add({
                                                    measurementUnit: MeasurementUnit.KG,
                                                })
                                            }
                                            block
                                        >
                                            {`+ ${t("addExercise")}`}
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    )}
                </Form.List>
            </Form.Item>
        </Card>
    );
};

export default TrainingCard;
