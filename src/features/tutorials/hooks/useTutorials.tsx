import useDeleteTutorial from "./useDeleteTutorial";
import useFetchTutorials from "./useFetchTutorials";

const useTutorials = () => {
    const { handleDelete } = useDeleteTutorial();
    const { data, isLoading, isError, currentPage, searchParams, handlePageChange, handleSearch } = useFetchTutorials();

    return {
        data,
        isLoading,
        isError,
        currentPage,
        searchParams,
        handlePageChange,
        handleSearch,
        handleDelete,
    };
};

export default useTutorials;
