import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "../../../shared/models/tables/handle-operations.model";
import { TableData } from "../../../shared/models/tables/table-data-response.model";
import { ExerciseTutorial } from "../models/exercise-tutorial.model";
import { exerciseTutorialQueryKeys } from "./query-keys";
import queryClient from "../../../apiCalls/QueryClient";
import { exerciseTutorialsMock } from "../mocks/exercise-tutorials.mock";

const fetchExerciseTutorials = async (searchParams: SearchParams, page: number) => {
    const exerciseTutorials = queryClient.getQueryData<TableData<ExerciseTutorial>>(
        exerciseTutorialQueryKeys.list(page, searchParams),
    );

    if (exerciseTutorials) {
        return exerciseTutorials;
    }

    return new Promise<TableData<ExerciseTutorial>>((resolve) => {
        setTimeout(() => {
            resolve({
                items: exerciseTutorialsMock,
                page: 1,
                pageSize: 10,
                totalCount: exerciseTutorialsMock.length,
            });
        }, 1000);
    });
};

const useGetExerciseTutorials = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState<SearchParams>({});

    const { data, isError, isLoading, isRefetching } = useQuery({
        queryKey: exerciseTutorialQueryKeys.list(currentPage, searchParams),
        queryFn: () => fetchExerciseTutorials(searchParams, currentPage),
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (value: SearchParams) => {
        const newSearchParams: SearchParams = { ...searchParams, ...value };
        setSearchParams(newSearchParams);
    };

    // Handles the case when user deletes the last item on the page so the page won't stay empty
    if (data?.items?.length === 0 && currentPage > 1) {
        handlePageChange(currentPage - 1);
    }

    return {
        data,
        isLoading,
        isRefetching,
        isError,
        currentPage,
        handlePageChange,
        handleSearch,
    };
};

export default useGetExerciseTutorials;
