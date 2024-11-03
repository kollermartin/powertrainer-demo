import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "../../../shared/models/tables/handle-operations.model";
import { TableData } from "../../../shared/models/tables/table-data-response.model";
import { AdministrationTraining } from "../models/training.model";
import { administrationTrainingsQueryKeys } from "./query-keys";
import queryClient from "../../../apiCalls/QueryClient";
import { administrationTrainingsMock } from "../mocks/administration-trainings.mock";

const fetchAdministrationTrainings = async (searchParams: SearchParams, page: number) => {
    // Mocking the fetching of trainings, if in cache return from local state else return mock data

    const trainings = queryClient.getQueryData<TableData<AdministrationTraining>>(
        administrationTrainingsQueryKeys.list(page, searchParams),
    );

    if (trainings) {
        return new Promise<TableData<AdministrationTraining>>((resolve) => {
            resolve(trainings);
        });
    }

    return new Promise<TableData<AdministrationTraining>>((resolve) => {
        setTimeout(() => {
            resolve(administrationTrainingsMock);
        }, 1000);
    });
};

const useGetAdministrationTrainings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState<SearchParams>({});

    const { data, isError, isLoading, isRefetching } = useQuery({
        queryKey: administrationTrainingsQueryKeys.list(currentPage, searchParams),
        queryFn: () => fetchAdministrationTrainings(searchParams, currentPage),
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

export default useGetAdministrationTrainings;
