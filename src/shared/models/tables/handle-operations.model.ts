export interface SearchParams {
    [key: string]: string | number | null;
}

export type HandleSearch = (value: SearchParams) => void;

export type HandlePageChange = (page: number) => void;
