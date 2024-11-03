import { InfiniteData } from "@tanstack/react-query";
import DifficultyType from "../../features/trainings/enums/difficulty-type.enum";
import { IExerciseTutorialForm } from "../../features/trainings/models/forms/exercise-tutorial-form.model";
import { ExerciseForm, ITrainingsForm } from "../../features/trainings/models/forms/trainings-form.model";
import {
    difficultyToSelectValue,
    fromInfiniteQueryToTrainings,
    getDifficultyTranslationKey,
    getMeasurementTranslationKey,
    isDifficultyType,
    prepareDifficultyFromSelectValue,
    prepareExercises,
    prepareExerciseTutorialSource,
    removeIndexFromVideoName,
    trainingDetailToPatchTraining,
    trainingsFormToCreateTrainingRequest,
} from "../../features/trainings/utils/trainings.utils";
import MeasurementUnit from "../../features/trainings/enums/measurement-unit.enum";
import { CreateTrainingRequest, ExerciseRequest, Trainings } from "../../features/trainings/models/dto/training.dto";
import { Difficulty } from "../../features/trainings/models/difficulty.model";
import { Measurement } from "../../features/trainings/models/measurement.model";
import { mockTraining, mockTrainingDetail } from "../../test/__mocks__/trainings.mock";
import ExerciseTutorialType from "../../features/trainings/enums/exercise-tutorial-type.enum";
import { mockExerciseDetail } from "../../test/__mocks__/exercises.mock";
import { PatchTraining } from "../../features/trainings/models/training.model";

describe("prepareExerciseTutorialSource", () => {
    it("returns powerTrainerSource value as string when type is 1", () => {
        const form: IExerciseTutorialForm = {
            type: 1,
            powerTrainerSource: { value: 123, label: "Power Trainer" },
            youtubeLink: "",
            name: "",
            description: "",
        };
        expect(prepareExerciseTutorialSource(form)).toBe("123");
    });

    it("returns youtubeLink when type is 2", () => {
        const form: IExerciseTutorialForm = {
            type: 2,
            powerTrainerSource: { value: "", label: "" },
            youtubeLink: "https://youtube.com/example",
            name: "",
            description: "",
        };
        expect(prepareExerciseTutorialSource(form)).toBe("https://youtube.com/example");
    });

    it("returns undefined for other types", () => {
        const form: IExerciseTutorialForm = {
            type: 3 as never,
            powerTrainerSource: { value: "", label: "" },
            youtubeLink: "",
            name: "",
            description: "",
        };
        expect(prepareExerciseTutorialSource(form)).toBeUndefined();
    });

    it("returns undefined when powerTrainerSource value is null for type 1", () => {
        const form: IExerciseTutorialForm = {
            type: 1,
            powerTrainerSource: { value: null, label: "" },
            youtubeLink: "",
            name: "",
            description: "",
        };
        expect(prepareExerciseTutorialSource(form)).toBeUndefined();
    });
});

describe("isDifficultyType", () => {
    it("returns true for valid difficulty type", () => {
        expect(isDifficultyType(DifficultyType.NONE)).toBe(true);
        expect(isDifficultyType(DifficultyType.RPE)).toBe(true);
        expect(isDifficultyType(DifficultyType.LOAD)).toBe(true);
    });

    it("returns false for invalid difficulty type", () => {
        expect(isDifficultyType(999)).toBe(false);
        expect(isDifficultyType(-1)).toBe(false);
    });
});

describe("prepareDifficultyFromSelectValue", () => {
    it("returns correct type and value for valid difficulty string", () => {
        expect(prepareDifficultyFromSelectValue("1-5")).toEqual({ type: DifficultyType.RPE, value: 5 });
        expect(prepareDifficultyFromSelectValue("2-10")).toEqual({ type: DifficultyType.LOAD, value: 10 });
    });

    it("returns NONE type for invalid difficulty type", () => {
        expect(prepareDifficultyFromSelectValue("999-5")).toEqual({ type: DifficultyType.NONE, value: 5 });
    });

    it("returns NONE type and 0 value for invalid difficulty string", () => {
        expect(prepareDifficultyFromSelectValue("invalid")).toEqual({ type: DifficultyType.NONE, value: NaN });
    });

    it("returns NONE type and 0 value for empty difficulty string", () => {
        expect(prepareDifficultyFromSelectValue("")).toEqual({ type: DifficultyType.NONE, value: NaN });
    });

    it("returns correct type and value for difficulty string with extra spaces", () => {
        expect(prepareDifficultyFromSelectValue(" 1-5 ")).toEqual({ type: DifficultyType.RPE, value: 5 });
    });
});

describe("prepareExercises", () => {
    it("returns correct ExerciseRequest array for valid ExerciseForm array", () => {
        const exercises: ExerciseForm[] = [
            {
                exerciseTutorial: { value: "1", label: "Tutorial 1" },
                reps: 10,
                sets: 3,
                measurementUnit: MeasurementUnit.KG,
                measurementValue: 20,
                note: "Note 1",
                difficulty: "1-5",
            },
        ];
        const expected: ExerciseRequest[] = [
            {
                exerciseTutorialId: "1",
                reps: 10,
                sets: 3,
                measurement: { unit: MeasurementUnit.KG, value: 20 },
                ownerNote: "Note 1",
                difficulty: { type: DifficultyType.RPE, value: 5 },
            },
        ];
        expect(prepareExercises(exercises)).toEqual(expected);
    });

    it("returns ExerciseRequest with NONE difficulty type when difficulty is not provided", () => {
        const exercises: ExerciseForm[] = [
            {
                exerciseTutorial: { value: "1", label: "Tutorial 1" },
                reps: 10,
                sets: 3,
                measurementUnit: MeasurementUnit.KG,
                measurementValue: 20,
                note: "Note 1",
                difficulty: "",
            },
        ];
        const expected: ExerciseRequest[] = [
            {
                exerciseTutorialId: "1",
                reps: 10,
                sets: 3,
                measurement: { unit: MeasurementUnit.KG, value: 20 },
                ownerNote: "Note 1",
                difficulty: { type: DifficultyType.NONE, value: 0 },
            },
        ];
        expect(prepareExercises(exercises)).toEqual(expected);
    });
    it("returns empty array when input is empty", () => {
        const exercises: ExerciseForm[] = [];
        const expected: ExerciseRequest[] = [];
        expect(prepareExercises(exercises)).toEqual(expected);
    });
});

describe("getDifficultyTranslationKey", () => {
    it("returns empty string for NONE difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.NONE, value: 0 };
        expect(getDifficultyTranslationKey(difficulty)).toBe("");
    });

    it("returns correct translation key for RPE difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.RPE, value: 5 };
        expect(getDifficultyTranslationKey(difficulty)).toBe("difficultyRpe");
    });

    it("returns correct translation key for LOAD difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.LOAD, value: 10 };
        expect(getDifficultyTranslationKey(difficulty)).toBe("difficultyLoad10");
    });
});

describe("getMeasurementTranslationKey", () => {
    it("returns empty string for NONE measurement unit", () => {
        const measurement: Measurement = { unit: MeasurementUnit.NONE, value: 0 };
        expect(getMeasurementTranslationKey(measurement)).toBe("");
    });

    it("returns correct translation key for valid measurement unit", () => {
        const measurement: Measurement = { unit: MeasurementUnit.KG, value: 20 };
        expect(getMeasurementTranslationKey(measurement)).toBe("measurementUnitWithValue1");
    });

    it("returns correct translation key for another valid measurement unit", () => {
        const measurement: Measurement = { unit: MeasurementUnit.LB, value: 45 };
        expect(getMeasurementTranslationKey(measurement)).toBe("measurementUnitWithValue2");
    });
});

describe("difficultyToSelectValue", () => {
    it("returns null for null difficulty", () => {
        expect(difficultyToSelectValue(null)).toBeNull();
    });

    it("returns null for NONE difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.NONE, value: 0 };
        expect(difficultyToSelectValue(difficulty)).toBeNull();
    });

    it("returns correct string for RPE difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.RPE, value: 5 };
        expect(difficultyToSelectValue(difficulty)).toBe("1-5");
    });

    it("returns correct string for LOAD difficulty type", () => {
        const difficulty: Difficulty = { type: DifficultyType.LOAD, value: 10 };
        expect(difficultyToSelectValue(difficulty)).toBe("2-10");
    });

    it("returns correct string for difficulty type with extra spaces", () => {
        const difficulty: Difficulty = { type: DifficultyType.RPE, value: 5 };
        expect(difficultyToSelectValue({ ...difficulty, value: 5 })).toBe("1-5");
    });
});

describe("trainingsFormToCreateTrainingRequest", () => {
    it("returns correct CreateTrainingRequest for valid ITrainingsForm", () => {
        const trainingsForm: ITrainingsForm = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: { value: "1", label: "Assignee 1" },
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorial: { value: "1", label: "Tutorial 1" },
                            reps: 10,
                            sets: 3,
                            measurementUnit: MeasurementUnit.KG,
                            measurementValue: 20,
                            note: "Note 1",
                            difficulty: "1-5",
                        },
                    ],
                },
            ],
        };
        const expected: CreateTrainingRequest = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: "1",
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorialId: "1",
                            reps: 10,
                            sets: 3,
                            measurement: { unit: MeasurementUnit.KG, value: 20 },
                            ownerNote: "Note 1",
                            difficulty: { type: DifficultyType.RPE, value: 5 },
                        },
                    ],
                },
            ],
        };
        expect(trainingsFormToCreateTrainingRequest(trainingsForm)).toEqual(expected);
    });

    it("returns CreateTrainingRequest with empty exercises array when no exercises are provided", () => {
        const trainingsForm: ITrainingsForm = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: { value: "1", label: "Assignee 1" },
                    scheduledDate: "2023-10-01",
                    exercises: [],
                },
            ],
        };
        const expected: CreateTrainingRequest = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: "1",
                    scheduledDate: "2023-10-01",
                    exercises: [],
                },
            ],
        };
        expect(trainingsFormToCreateTrainingRequest(trainingsForm)).toEqual(expected);
    });

    it("returns CreateTrainingRequest with default values when optional fields are not provided", () => {
        const trainingsForm: ITrainingsForm = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: { value: "1", label: "Assignee 1" },
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorial: { value: "1", label: "Tutorial 1" },
                            reps: null,
                            sets: null,
                            measurementUnit: MeasurementUnit.KG,
                            measurementValue: null,
                            note: "",
                            difficulty: "",
                        },
                    ],
                },
            ],
        };
        const expected: CreateTrainingRequest = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: "1",
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorialId: "1",
                            reps: 0,
                            sets: 0,
                            measurement: { unit: MeasurementUnit.KG, value: 0 },
                            ownerNote: "",
                            difficulty: { type: DifficultyType.NONE, value: 0 },
                        },
                    ],
                },
            ],
        };
        expect(trainingsFormToCreateTrainingRequest(trainingsForm)).toEqual(expected);
    });

    it("returns CreateTrainingRequest with multiple trainings", () => {
        const trainingsForm: ITrainingsForm = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: { value: "1", label: "Assignee 1" },
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorial: { value: "1", label: "Tutorial 1" },
                            reps: 10,
                            sets: 3,
                            measurementUnit: MeasurementUnit.KG,
                            measurementValue: 20,
                            note: "Note 1",
                            difficulty: "1-5",
                        },
                    ],
                },
                {
                    name: "Training 2",
                    assigneeId: { value: "2", label: "Assignee 2" },
                    scheduledDate: "2023-10-02",
                    exercises: [
                        {
                            exerciseTutorial: { value: "2", label: "Tutorial 2" },
                            reps: 15,
                            sets: 4,
                            measurementUnit: MeasurementUnit.LB,
                            measurementValue: 30,
                            note: "Note 2",
                            difficulty: "2-10",
                        },
                    ],
                },
            ],
        };
        const expected: CreateTrainingRequest = {
            trainings: [
                {
                    name: "Training 1",
                    assigneeId: "1",
                    scheduledDate: "2023-10-01",
                    exercises: [
                        {
                            exerciseTutorialId: "1",
                            reps: 10,
                            sets: 3,
                            measurement: { unit: MeasurementUnit.KG, value: 20 },
                            ownerNote: "Note 1",
                            difficulty: { type: DifficultyType.RPE, value: 5 },
                        },
                    ],
                },
                {
                    name: "Training 2",
                    assigneeId: "2",
                    scheduledDate: "2023-10-02",
                    exercises: [
                        {
                            exerciseTutorialId: "2",
                            reps: 15,
                            sets: 4,
                            measurement: { unit: MeasurementUnit.LB, value: 30 },
                            ownerNote: "Note 2",
                            difficulty: { type: DifficultyType.LOAD, value: 10 },
                        },
                    ],
                },
            ],
        };
        expect(trainingsFormToCreateTrainingRequest(trainingsForm)).toEqual(expected);
    });
});

describe("trainingDetailToPatchTraining", () => {
    it("returns PatchTraining for valid TrainingDetail", () => {
        const training = mockTrainingDetail({
            name: "Training 1",
            assigneeId: "1",
            scheduledDate: "2023-10-01",
            exercises: [
                mockExerciseDetail({
                    exerciseTutorial: {
                        id: "1",
                        name: "Tutorial 1",
                        type: ExerciseTutorialType.POWERTRAINER,
                        source: "",
                    },
                    reps: 10,
                    sets: 3,
                    measurement: { unit: MeasurementUnit.KG, value: 20 },
                    ownerNote: "Note 1",
                    difficulty: { type: DifficultyType.RPE, value: 5 },
                }),
            ],
        });

        const expected: PatchTraining = {
            name: "Training 1",
            assigneeId: "1",
            scheduledDate: "2023-10-01",
            exercises: [
                {
                    exerciseTutorialId: "1",
                    reps: 10,
                    sets: 3,
                    measurement: { unit: MeasurementUnit.KG, value: 20 },
                    ownerNote: "Note 1",
                    difficulty: { type: DifficultyType.RPE, value: 5 },
                },
            ],
        };

        expect(trainingDetailToPatchTraining(training)).toEqual(expected);
    });

    it("returns PatchTraining with empty exercises array when no exercises are provided", () => {
        const training = mockTrainingDetail({
            name: "Training 1",
            assigneeId: "1",
            scheduledDate: "2023-10-01",
            exercises: [],
        });
        const expected: PatchTraining = {
            name: "Training 1",
            assigneeId: "1",
            scheduledDate: "2023-10-01",
            exercises: [],
        };
        expect(trainingDetailToPatchTraining(training)).toEqual(expected);
    });
});

describe("fromInfiniteQueryToTrainings", () => {
    it("returns empty Trainings when data is undefined", () => {
        const result = fromInfiniteQueryToTrainings(undefined);
        expect(result).toEqual({ items: [], page: 1, pageSize: 10, totalCount: 0 });
    });

    it("returns empty Trainings when data has no pages", () => {
        const data: InfiniteData<Trainings> = { pages: [], pageParams: [] };
        const result = fromInfiniteQueryToTrainings(data);
        expect(result).toEqual({ items: [], page: 1, pageSize: 10, totalCount: 0 });
    });

    it("aggregates items from multiple pages", () => {
        const data: InfiniteData<Trainings> = {
            pages: [
                {
                    items: [mockTraining({ id: "1" }), mockTraining({ id: "2" })],
                    page: 1,
                    pageSize: 2,
                    totalCount: 4,
                },
                {
                    items: [mockTraining({ id: "3" }), mockTraining({ id: "4" })],
                    page: 2,
                    pageSize: 2,
                    totalCount: 4,
                },
            ],
            pageParams: [],
        };
        const result = fromInfiniteQueryToTrainings(data);
        expect(result).toEqual({
            items: [
                mockTraining({ id: "1" }),
                mockTraining({ id: "2" }),
                mockTraining({ id: "3" }),
                mockTraining({ id: "4" }),
            ],
            page: 2,
            pageSize: 2,
            totalCount: 4,
        });
    });

    it("handles single page data correctly", () => {
        const data: InfiniteData<Trainings> = {
            pages: [{ items: [mockTraining({ id: "1" })], page: 1, pageSize: 1, totalCount: 1 }],
            pageParams: [],
        };
        const result = fromInfiniteQueryToTrainings(data);
        expect(result).toEqual({
            items: [mockTraining({ id: "1" })],
            page: 1,
            pageSize: 1,
            totalCount: 1,
        });
    });
});

describe("removeIndexFromVideoName", () => {
    it("removes index from video name with index", () => {
        const videoName = "video-123";
        const result = removeIndexFromVideoName(videoName);
        expect(result).toBe("video");
    });

    it("returns original video name when no index is present", () => {
        const videoName = "video";
        const result = removeIndexFromVideoName(videoName);
        expect(result).toBe("video");
    });

    it("removes index from video name with multiple dashes", () => {
        const videoName = "my-video-123";
        const result = removeIndexFromVideoName(videoName);
        expect(result).toBe("my-video");
    });

    it("removes index from video name with trailing dash", () => {
        const videoName = "video-";
        const result = removeIndexFromVideoName(videoName);
        expect(result).toBe("video-");
    });

    it("removes index from video name with numbers in the middle", () => {
        const videoName = "video123-456";
        const result = removeIndexFromVideoName(videoName);
        expect(result).toBe("video123");
    });
});
