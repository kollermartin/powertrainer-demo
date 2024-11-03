import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DefaultOptionType } from "antd/lib/select";
import { useDebounce } from "@uidotdev/usehooks";
import THROTTLE_DELAY_MS from "../../../shared/const/api.const";
import { exerciseTutorialQueryKeys } from "./query-keys";
import { AutocompleteResponse } from "../../../shared/models/autocomplete.model";
import { ExerciseTutorialAutocompleteOption } from "../models/exercise-tutorial.model";
import { exerciseTutorialsAutocompleteMock } from "../mocks/exercise-tutorials-autocomplete.mock";

const fetchExerciseTutorialOptions = async (
    signal: AbortSignal | undefined,
    search: string,
): Promise<AutocompleteResponse<ExerciseTutorialAutocompleteOption>> => {
    // const response = await apiClient.get<AutocompleteResponse<ExerciseTutorialAutocompleteOption>>(
    //     `/api/exercise-tutorials/autocomplete`,
    //     {
    //         params: { search },
    //         signal,
    //     },
    // );
    // return response.data;
    console.log("fetchExerciseTutorialOptions", search, signal);
    return new Promise((resolve) => {
        resolve({
            items: exerciseTutorialsAutocompleteMock.filter((tutorial) =>
                search ? tutorial.name.includes(search) : true,
            ),
        });
    });
};

const useGetExerciseTutorialAutocomplete = () => {
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, THROTTLE_DELAY_MS);

    const { data, isError, isLoading } = useQuery({
        queryKey: exerciseTutorialQueryKeys.autocomplete(debounceSearch),
        queryFn: ({ signal }) => fetchExerciseTutorialOptions(signal, debounceSearch),
    });

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const optionFormat: DefaultOptionType[] | undefined =
        data?.items.map((item) => ({
            value: item.id,
            label: item.name,
        })) ?? undefined;

    return {
        data: optionFormat,
        isError,
        isLoading,
        handleSearch,
    };
};

export default useGetExerciseTutorialAutocomplete;
