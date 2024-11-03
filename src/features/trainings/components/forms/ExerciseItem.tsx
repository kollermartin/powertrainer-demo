import { Col, Divider, Form, FormInstance, FormListFieldData, FormListOperation, InputNumber, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined, CopyOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { getDifficultyOptions, getMeasurementUnitOptions } from "../../utils/form-options";
import module from "./TrainingsForm.module.css";
import { ITrainingsForm } from "../../models/forms/trainings-form.model";
import { requiredRule } from "../../../../shared/rules/form.rules";
import {
    MAX_EXERCISES_NUMBER_VALUE,
    MAX_TEXT_AREA_LENGTH,
    MIN_EXERCISES_NUMBER_VALUE,
} from "../../const/trainings.const";
import useGetExerciseTutorialAutocomplete from "../../hooks/useGetExerciseTutorialAutocomplete";
import selectValueRequired from "../../../../shared/validators/form.validators";

interface ExerciseItemProps {
    parentField: FormListFieldData;
    exerciseField: FormListFieldData;
    fieldsLength: number;
    index: number;
    form: FormInstance<ITrainingsForm>;
    add: FormListOperation["add"];
    remove: FormListOperation["remove"];
    disableCopy: boolean;
}

const ExerciseItem = ({
    parentField,
    exerciseField,
    fieldsLength,
    index,
    form,
    add,
    remove,
    disableCopy,
}: ExerciseItemProps) => {
    const { t } = useTranslation(["trainings", "common"]);
    const difficultyOptions = getDifficultyOptions(t);
    const measurementUnitOptions = getMeasurementUnitOptions(t);
    const gutter = { xs: 8, sm: 10, md: 12 };
    const exercisesLength = form.getFieldValue(["trainings", parentField.name, "exercises"]).length;
    const { handleSearch, data, isLoading } = useGetExerciseTutorialAutocomplete();

    const handleCopyExercise = () => {
        const fieldValue = {
            ...form.getFieldValue(["trainings", parentField.name, "exercises", exerciseField.name]),
        };
        add(fieldValue, index + 1);
    };

    return (
        <>
            <Row gutter={gutter}>
                <Col
                    xs={24}
                    sm={12}
                    lg={{
                        span: 5,
                        offset: 1,
                    }}
                >
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "exerciseTutorial"]}
                        label={t("exercisesName")}
                        rules={[
                            {
                                validator: selectValueRequired,
                                message: t("selectExercise"),
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
                            notFoundContent={<span>{t("noExerciseTutorial")}</span>}
                            onSearch={handleSearch}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6} lg={3}>
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "reps"]}
                        label={t("exercisesReps")}
                        rules={[requiredRule]}
                    >
                        <InputNumber
                            min={MIN_EXERCISES_NUMBER_VALUE}
                            max={MAX_EXERCISES_NUMBER_VALUE}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6} lg={3}>
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "sets"]}
                        label={t("exercisesSets")}
                        rules={[requiredRule]}
                    >
                        <InputNumber
                            min={MIN_EXERCISES_NUMBER_VALUE}
                            max={MAX_EXERCISES_NUMBER_VALUE}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6} lg={3}>
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "measurementValue"]}
                        label={t("exercisesMeasurement")}
                        rules={[requiredRule]}
                    >
                        <InputNumber
                            min={0}
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={6} lg={3}>
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "measurementUnit"]}
                        label={t("exercisesMeasurementUnit")}
                        rules={[requiredRule]}
                    >
                        <Select options={measurementUnitOptions} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={4}>
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "difficulty"]}
                        label={t("exercisesDifficulty")}
                        rules={[requiredRule]}
                    >
                        <Select options={difficultyOptions} />
                    </Form.Item>
                </Col>
                <Col
                    xs={24}
                    lg={{
                        span: 21,
                        offset: 1,
                    }}
                >
                    <Form.Item<ITrainingsForm["trainings"][number]["exercises"]>
                        name={[exerciseField.name, "note"]}
                        label={t("exercisesNotes")}
                    >
                        <TextArea maxLength={MAX_TEXT_AREA_LENGTH} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={2} className={module.exerciseActions}>
                    {!disableCopy && <CopyOutlined onClick={handleCopyExercise} />}
                    {exercisesLength > 1 && (
                        <CloseOutlined
                            onClick={() => {
                                remove(exerciseField.name);
                            }}
                        />
                    )}
                </Col>
            </Row>
            <Row justify="center">
                <Col
                    xs={24}
                    lg={{
                        span: 22,
                        offset: 1,
                    }}
                >
                    {fieldsLength !== index + 1 && <Divider key={exerciseField.key} />}
                </Col>
            </Row>
        </>
    );
};

export default ExerciseItem;
