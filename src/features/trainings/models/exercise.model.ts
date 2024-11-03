import { Measurement } from "./measurement.model";
import { Difficulty } from "./difficulty.model";
import { ExerciseTutorial } from "./exercise-tutorial.model";

export interface Exercise {
    id: string;
    name: string;
    reps: number;
    sets: number;
    measurement: Measurement;
    difficulty: Difficulty;
}

export interface ExerciseDetail {
    id: string;
    name: string;
    reps: number;
    sets: number;
    exerciseTutorial: ExerciseTutorial;
    measurement: Measurement;
    difficulty: Difficulty;
    assigneeNote: string;
    assigneeDifficulty: Difficulty | null;
    ownerNote: string;
    videoAttempts?: ExerciseVideo[];
}

export interface PatchExercise {
    reps: number;
    sets: number;
    measurement: Measurement;
    difficulty: Difficulty;
    exerciseTutorialId: string;
    ownerNote: string;
}

export interface ExerciseVideo {
    videoName: string;
    videoId: string;
    status: number;
}
