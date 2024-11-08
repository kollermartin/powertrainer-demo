import { TableData } from "../../../shared/models/tables/table-data-response.model";
import { AdministrationTraining } from "../models/training.model";

export const administrationTrainingsMock: TableData<AdministrationTraining> = {
    items: [
        {
            id: "d5b50c9d-2628-441a-adab-2d6f088dd6fe",
            name: "Strength Training - Squat Focus",
            assigneeName: "Mark Johnson",
            scheduledDate: "2024-11-01",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.525597Z",
        },
        {
            id: "e299d874-e438-40b4-8c54-f9140e1bfa0a",
            name: "Strength Training - Squat Focus (AM Session)",
            assigneeName: "Alice Smith",
            scheduledDate: "2024-11-02",
            completed: true,
            createdOnUtc: "2024-10-29T15:33:20.52656Z",
        },
        {
            id: "0db199e9-095c-425e-b194-3af4433787c6",
            name: "Strength Training - Squat Focus (PM Session)",
            assigneeName: "John Doe",
            scheduledDate: "2024-11-03",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.526564Z",
        },
        {
            id: "8f66ba12-0492-4492-89c2-d513bafe9727",
            name: "Heavy Lift Session - Deadlift Focus",
            assigneeName: "Emma Davis",
            scheduledDate: "2024-11-04",
            completed: true,
            createdOnUtc: "2024-10-11T16:54:35.667851Z",
        },
        {
            id: "71b528e2-c682-476d-b6b5-da15cd792942",
            name: "Strength Training - Bench Press Focus",
            assigneeName: "Tom Harris",
            scheduledDate: "2024-11-05",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.526566Z",
        },
        {
            id: "1fa087ff-852b-42a9-b584-241cc5d4bb8f",
            name: "Strength Training - Squat Technique",
            assigneeName: "Sophia Lee",
            scheduledDate: "2024-11-06",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.526567Z",
        },
        {
            id: "1ed37f92-0820-4758-a8d7-a1256ae6765a",
            name: "Strength Training - Core Focus",
            assigneeName: "Mike Brown",
            scheduledDate: "2024-11-07",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.526568Z",
        },
        {
            id: "5c8d2ee4-6c9c-4b27-952a-d9ccfc05e1cf",
            name: "Strength Training - Accessory Work",
            assigneeName: "Lucy Miller",
            scheduledDate: "2024-11-08",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.526569Z",
        },
        {
            id: "3373f793-80eb-49ed-b041-efbd06e0b06c",
            name: "Strength Training - Mobility and Flexibility",
            assigneeName: "Chris Wilson",
            scheduledDate: "2024-11-09",
            completed: false,
            createdOnUtc: "2024-10-29T15:33:20.52657Z",
        },
    ],
    page: 1,
    pageSize: 10,
    totalCount: 9,
};
