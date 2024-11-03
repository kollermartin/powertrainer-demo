import { Difficulty } from "../difficulty.model";

export interface UpdateExerciseFeedbackRequest {
    difficulty: Difficulty;
    note?: string;
}
