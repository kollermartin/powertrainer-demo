import { SearchParams } from "../../../shared/models/tables/handle-operations.model";

export const trainingQueryKeys = {
    all: ["trainings"] as const,
    list: (previous = false) => [...trainingQueryKeys.all, "list", { previous }] as const,
    detail: (id: string) => [...trainingQueryKeys.all, id] as const,
    assignee: (assigneeId: string, page: number, searchParams: SearchParams) =>
        [...trainingQueryKeys.all, "assignee", assigneeId, { page, searchParams }] as const,
    exerciseStream: (trainingId: string, exerciseId: string) =>
        [...trainingQueryKeys.all, trainingId, "exercises", exerciseId, "tutorial-stream"] as const,
};

export const administrationTrainingsQueryKeys = {
    all: ["administrationTrainings"] as const,
    list: (page: number, searchParams: SearchParams) =>
        [...administrationTrainingsQueryKeys.all, { page, searchParams }] as const,
};

export const exerciseTutorialQueryKeys = {
    all: ["exerciseTutorials"] as const,
    list: (page: number, searchParams: SearchParams) =>
        [...exerciseTutorialQueryKeys.all, { page, searchParams }] as const,
    detail: (id: string) => [...exerciseTutorialQueryKeys.all, id] as const,
    autocomplete: (search: string) => [...exerciseTutorialQueryKeys.all, "autocomplete", { search }] as const,
};
