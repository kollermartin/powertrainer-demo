import { useState } from "react";
import { App, PaginationProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { SearchParams } from "../../../shared/models/tables/handle-operations.model";
import { Tutorials } from "./Dto";
import { tutorialQueryKeys } from "./query-keys";
import queryClient from "../../../apiCalls/QueryClient";
import { tutorialsMock } from "../components/mocks/tutorials.mock";

const fetchTutorials = async ({ page, searchParams }: { page: number; searchParams: SearchParams }) => {
    // Mocking the fetching of tutorials, if in cache return from cache else return mock data
    const tutorials = queryClient.getQueryData(tutorialQueryKeys.list(page, searchParams)) as Tutorials;

    if (tutorials) {
        return new Promise<Tutorials>((resolve) => {
            resolve(tutorials);
        });
    }

    return new Promise<Tutorials>((resolve) => {
        setTimeout(() => {
            resolve({
                items: tutorialsMock,
                page: 1,
                pageSize: 12,
                totalCount: tutorialsMock.length,
            });
        }, 1000);
    });
};

const useFetchTutorials = () => {
    const { notification } = App.useApp();
    const { t } = useTranslation("tutorials");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState<SearchParams>({});

    const { data, isLoading, isError } = useQuery({
        queryKey: tutorialQueryKeys.list(currentPage, searchParams),
        queryFn: () => fetchTutorials({ page: currentPage, searchParams }),
    });

    const handlePageChange: PaginationProps["onChange"] = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (value: SearchParams) => {
        const newSearchParams = { ...searchParams, ...value };
        setSearchParams(newSearchParams);
    };

    if (isError) {
        notification.error({
            message: t("tutorialsFetchFailed"),
        });
    }

    return {
        data,
        isLoading,
        isError,
        currentPage,
        searchParams,
        handlePageChange,
        handleSearch,
    };
};

export default useFetchTutorials;
