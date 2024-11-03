import { Exercise, ExerciseDetail, PatchExercise } from "./exercise.model";

export interface Training {
    id: string;
    name: string;
    assigneeId: string;
    completed: boolean;
    scheduledDate: string;
    createdOnUtc: string;
    exercises: Exercise[];
}

export interface TrainingDetail {
    id: string;
    name: string;
    assigneeId: string;
    assigneeName: string;
    completed: boolean;
    scheduledDate: string;
    createdOnUtc: string;
    exercises: ExerciseDetail[];
    videos: string[];
    assigneeReview: string;
    ownerReview: string;
}

export interface PatchTraining {
    name: string;
    assigneeId: string;
    scheduledDate: string;
    exercises: PatchExercise[];
}

export interface AdministrationTraining {
    id: string;
    name: string;
    assigneeName: string;
    scheduledDate: string;
    completed: boolean;
    createdOnUtc: string;
}

export interface AssigneeTraining {
    id: string;
    name: string;
    scheduledDate: string;
    completed: boolean;
    createdOnUtc: string;
}
