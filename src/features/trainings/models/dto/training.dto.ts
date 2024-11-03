import { Training } from "../training.model";
import { Measurement } from "../measurement.model";
import { Difficulty } from "../difficulty.model";

export interface Trainings {
    items: Training[];
    page: number;
    pageSize: number;
    totalCount: number;
}

export interface CreateTrainingRequest {
    trainings: {
        name: string;
        assigneeId: string;
        scheduledDate: string;
        exercises: ExerciseRequest[];
    }[];
}
export interface CreateTrainingResponse extends CreateTrainingRequest {
    completed: boolean;
    createdOnUtc: string;
}

export interface ExerciseRequest {
    exerciseTutorialId: string;
    reps: number;
    sets: number;
    measurement: Measurement;
    difficulty: Difficulty;
    ownerNote: string;
}

export interface TrainingFeedbackRequest {
    review: string;
}

export interface UploadExerciseVideosRequest {
    videoAttempts: VideoAttempt[];
}

export interface UploadExerciseVideosResponse {
    videoUploads: VideoUpload[];
}

export interface VideoAttempt {
    name: string;
    contentLength: number;
}

export interface VideoUpload {
    videoName: string;
    videoId: string;
    uploadLink: string;
}
