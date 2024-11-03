import { ExerciseDetail } from "../../features/trainings/models/exercise.model";
import ExerciseTutorialType from "../../features/trainings/enums/exercise-tutorial-type.enum";
import MeasurementUnit from "../../features/trainings/enums/measurement-unit.enum";
import DifficultyType from "../../features/trainings/enums/difficulty-type.enum";

export const mockExerciseDetail = (config?: Partial<ExerciseDetail>): ExerciseDetail => {
    return {
        exerciseTutorial: { id: "1", name: "Tutorial 1", type: ExerciseTutorialType.POWERTRAINER, source: "" },
        reps: 10,
        sets: 3,
        measurement: { unit: MeasurementUnit.KG, value: 20 },
        ownerNote: "Note 1",
        difficulty: { type: DifficultyType.RPE, value: 5 },
        assigneeNote: "Note 2",
        videoAttempts: [],
        id: "1",
        name: "Exercise 1",
        assigneeDifficulty: null,
        ...config,
    };
};
