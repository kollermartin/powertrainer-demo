import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { DefaultOptionType } from "antd/lib/select";
import { AutocompleteResponse, UserProfileAutocompleteOption } from "../models/autocomplete.model";
import THROTTLE_DELAY_MS from "../const/api.const";
import { userProfilesAutocompleteMock } from "../mocks/user-profiles-autocomplete.mock";

const fetchGroupMembers = async (
    signal: AbortSignal | undefined,
    search: string,
): Promise<AutocompleteResponse<UserProfileAutocompleteOption>> => {
    // const response = await apiClient.get<AutocompleteResponse<UserProfileAutocompleteOption>>(
    //     `/api/user-management/trainer-groups/members/autocomplete`,
    //     {
    //         params: { search },
    //         signal,
    //     },
    // );
    // return response.data;
    console.log("fetchGroupMembers", search, signal);
    return new Promise((resolve) => {
        resolve({ items: userProfilesAutocompleteMock.filter((user) => (search ? user.name.includes(search) : true)) });
    });
};

const useGetTrainerGroupMembersAutocomplete = () => {
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, THROTTLE_DELAY_MS);

    const { data, isError, isLoading } = useQuery({
        queryKey: ["userProfilesAutocomplete", debounceSearch],
        queryFn: ({ signal }) => fetchGroupMembers(signal, debounceSearch),
    });

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    console.log(data);

    const autocompleteOptions: DefaultOptionType[] | undefined = data?.items.map((item) => ({
        value: item.userProfileId,
        label: item.name,
    }));

    return {
        data: autocompleteOptions,
        isError,
        isLoading,
        handleSearch,
    };
};

export default useGetTrainerGroupMembersAutocomplete;
