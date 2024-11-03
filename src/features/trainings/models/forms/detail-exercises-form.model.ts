import { UploadFile } from "antd";

export interface ExerciseFeedback {
    assigneeDifficulty: string;
    assigneeNote: string;
    videos: UploadFile[];
}

export interface DetailExerciseForm {
    exercises: ExerciseFeedback[];
}
