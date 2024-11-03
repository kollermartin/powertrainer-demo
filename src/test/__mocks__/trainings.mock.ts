import { Training, TrainingDetail } from "../../features/trainings/models/training.model";

export const mockTrainingDetail = (config?: Partial<TrainingDetail>): TrainingDetail => {
    return {
        id: "1",
        name: "Training 1",
        assigneeId: "123",
        scheduledDate: "2021-10-01T00:00:00Z",
        exercises: [],
        completed: false,
        assigneeName: "John Doe",
        createdOnUtc: "2021-10-01T00:00:00Z",
        videos: [],
        assigneeReview: "",
        ownerReview: "",
        ...config,
    };
};

export const mockTraining = (config?: Partial<Training>): Training => {
    return {
        id: "1",
        name: "Training 1",
        assigneeId: "123",
        scheduledDate: "2021-10-01T00:00:00Z",
        exercises: [],
        completed: false,
        createdOnUtc: "2021-10-01T00:00:00Z",
        ...config,
    };
};
