import dayjs from "dayjs";
import { InfiniteData } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/lib/select";
import { Difficulty } from "../models/difficulty.model";
import DifficultyType from "../enums/difficulty-type.enum";
import { Measurement } from "../models/measurement.model";
import MeasurementUnit from "../enums/measurement-unit.enum";
import { ExerciseForm, ITrainingsForm } from "../models/forms/trainings-form.model";
import { CreateTrainingRequest, ExerciseRequest, Trainings } from "../models/dto/training.dto";
import toDateString from "../../../shared/utils/date.utils";
import { PatchTraining, TrainingDetail } from "../models/training.model";
import { IExerciseTutorialForm } from "../models/forms/exercise-tutorial-form.model";
import { ExerciseTutorialRequest } from "../models/dto/exercise-tutorials.dto";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import ExerciseTutorialType from "../enums/exercise-tutorial-type.enum";
import { ExerciseFeedback } from "../models/forms/detail-exercises-form.model";
import { UpdateExerciseFeedbackRequest } from "../models/dto/update-exercise-feedback.dto";
import { TutorialDetail } from "../../tutorials/hooks/Dto";

export const prepareExerciseTutorialSource = (form: IExerciseTutorialForm) => {
    switch (form.type) {
        case 1:
            return form.powerTrainerSource?.value?.toString();
        case 2:
            return form.youtubeLink;
        default:
            return undefined;
    }
};

export const isDifficultyType = (difficulty: number): difficulty is DifficultyType => {
    return Object.values(DifficultyType).includes(difficulty);
};

export const prepareDifficultyFromSelectValue = (difficulty: string) => {
    const [type, value] = difficulty.split("-");
    return {
        type: isDifficultyType(+type) ? +type : DifficultyType.NONE,
        value: +value,
    };
};

export const prepareExercises = (exercises: ExerciseForm[]) => {
    return exercises.map(
        (exercise) =>
            ({
                exerciseTutorialId: exercise.exerciseTutorial.value,
                reps: exercise?.reps ?? 0,
                sets: exercise?.sets ?? 0,
                measurement: {
                    unit: exercise.measurementUnit,
                    value: exercise.measurementValue ?? 0,
                },
                ownerNote: exercise.note,
                difficulty: exercise.difficulty
                    ? prepareDifficultyFromSelectValue(exercise.difficulty)
                    : { type: DifficultyType.NONE, value: 0 },
            }) as ExerciseRequest,
    );
};

export const getDifficultyTranslationKey = (difficulty: Difficulty) => {
    switch (difficulty.type) {
        case DifficultyType.NONE:
            return "";
        case DifficultyType.RPE:
            return "difficultyRpe";
        case DifficultyType.LOAD:
            return `difficultyLoad${difficulty.value}`;
        default:
            return "";
    }
};

export const getMeasurementTranslationKey = (measurement: Measurement) => {
    switch (measurement.unit) {
        case MeasurementUnit.NONE:
            return "";
        default:
            return `measurementUnitWithValue${measurement.unit}`;
    }
};

export const difficultyToSelectValue = (difficulty: Difficulty | null) => {
    if (!difficulty || difficulty.type === DifficultyType.NONE) {
        return null;
    }

    return `${difficulty.type}-${difficulty.value}`;
};

export const trainingsFormToCreateTrainingRequest = (trainingsForm: ITrainingsForm): CreateTrainingRequest => {
    return {
        trainings: trainingsForm.trainings.map((training) => ({
            name: training.name,
            assigneeId: training.assigneeId.value as string,
            scheduledDate: toDateString(training.scheduledDate),
            exercises: prepareExercises(training.exercises),
        })),
    };
};

export const trainingDetailToPatchTraining = (training: TrainingDetail): PatchTraining => {
    return {
        name: training.name,
        assigneeId: training.assigneeId,
        scheduledDate: toDateString(training.scheduledDate),
        exercises: training.exercises.map((exercise) => {
            return {
                exerciseTutorialId: exercise.exerciseTutorial.id,
                reps: exercise.reps,
                sets: exercise.sets,
                measurement: {
                    unit: exercise.measurement.unit,
                    value: exercise.measurement.value,
                },
                ownerNote: exercise.ownerNote,
                difficulty: exercise.difficulty,
            };
        }),
    };
};

export const trainingsFormToPatchTraining = (trainingsForm: ITrainingsForm): PatchTraining => {
    return {
        name: trainingsForm.trainings[0].name,
        assigneeId: trainingsForm.trainings[0].assigneeId.value as string,
        scheduledDate: toDateString(trainingsForm.trainings[0].scheduledDate),
        exercises: trainingsForm.trainings[0].exercises.map((exercise) => {
            return {
                exerciseTutorialId: exercise.exerciseTutorial.value as string,
                reps: exercise.reps ?? 0,
                sets: exercise.sets ?? 0,
                measurement: {
                    unit: exercise.measurementUnit,
                    value: exercise.measurementValue ?? 0,
                },
                ownerNote: exercise?.note ?? "",
                difficulty: prepareDifficultyFromSelectValue(exercise.difficulty),
            };
        }),
    };
};

export const fromInfiniteQueryToTrainings = (data: InfiniteData<Trainings> | undefined): Trainings => {
    return (data?.pages ?? []).reduce(
        (acc, page) => {
            acc.items.push(...page.items);

            acc.page = page.page;
            acc.pageSize = page.pageSize;
            acc.totalCount = page.totalCount;

            return acc;
        },
        { items: [], page: 1, pageSize: 10, totalCount: 0 },
    );
};

export const prepareTrainingsFormInitialValues = (training?: TrainingDetail): ITrainingsForm => {
    if (!training) {
        return {
            trainings: [
                {
                    name: "",
                    assigneeId: { value: "", label: "" },
                    scheduledDate: "",
                    exercises: [
                        {
                            exerciseTutorial: { value: "", label: "" },
                            measurementUnit: MeasurementUnit.KG,
                            measurementValue: null,
                            note: "",
                            reps: null,
                            sets: null,
                            difficulty: "",
                        },
                    ],
                },
            ],
        };
    }

    return {
        trainings: [
            {
                name: training.name,
                assigneeId: { value: training.assigneeId, label: training.assigneeName },
                scheduledDate: dayjs(training.scheduledDate),
                exercises: training.exercises.map((exercise) => {
                    return {
                        exerciseTutorial: {
                            value: exercise.exerciseTutorial.id,
                            label: exercise.exerciseTutorial.name,
                        },
                        reps: exercise.reps,
                        sets: exercise.sets,
                        measurementValue: exercise.measurement.value,
                        measurementUnit: exercise.measurement.unit,
                        difficulty: difficultyToSelectValue(exercise.difficulty) ?? "",
                        note: exercise.ownerNote,
                    };
                }),
            },
        ],
    };
};

export const prepareExerciseTutorialRequest = (form: IExerciseTutorialForm): ExerciseTutorialRequest => {
    return {
        name: form.name,
        type: form.type,
        source: prepareExerciseTutorialSource(form),
        description: form.description,
    };
};

export const prepareExerciseFormInitialValues = (
    exercise?: ExerciseTutorial,
    tutorial?: TutorialDetail,
): IExerciseTutorialForm => {
    if (exercise) {
        const exerciseTutorialForm: IExerciseTutorialForm = {
            name: exercise.name,
            type: exercise.type,
            youtubeLink: exercise.type === ExerciseTutorialType.YOUTUBE ? exercise.source : "",
            description: exercise.description ?? "",
        };

        if (tutorial) {
            exerciseTutorialForm.powerTrainerSource = {
                value: tutorial.id,
                label: tutorial.title,
            };
        }

        return exerciseTutorialForm;
    }

    return {
        name: "",
        type: 1,
        powerTrainerSource: { value: "", label: "" } as DefaultOptionType,
        youtubeLink: "",
        description: "",
    };
};

export const prepareExerciseFeedbackRequest = (form: ExerciseFeedback): UpdateExerciseFeedbackRequest => {
    const request: UpdateExerciseFeedbackRequest = {
        difficulty: prepareDifficultyFromSelectValue(form.assigneeDifficulty),
        // TODO BE return 500 if note is null or not present
        note: "",
    };

    if (form.assigneeNote) {
        request.note = form.assigneeNote;
    }

    return request;
};

export const removeIndexFromVideoName = (videoName: string): string => {
    const regex = /-\d+$/;

    // Replace the matched pattern with an empty string
    return videoName.replace(regex, "");
};
