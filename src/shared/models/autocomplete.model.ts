export interface AutocompleteResponse<T> {
    items: T[];
}

export interface UserProfileAutocompleteOption {
    id: string;
    userProfileId: string;
    name: string;
}
