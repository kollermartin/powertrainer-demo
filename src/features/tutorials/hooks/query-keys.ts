import { SearchParams } from "../../../shared/models/tables/handle-operations.model";

export const tutorialQueryKeys = {
    all: ["tutorials"] as const,
    list: (page: number, searchParams: SearchParams) => [...tutorialQueryKeys.all, { page, searchParams }] as const,
    detail: (id: string | undefined) => [...tutorialQueryKeys.all, id] as const,
    autocomplete: (search: string) => [...tutorialQueryKeys.all, "autocomplete", { search }] as const,
    stream: (videoId: string | undefined) => [...tutorialQueryKeys.all, "stream", videoId] as const,
};
