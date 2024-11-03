import { SearchParams } from "./handle-operations.model";

export interface TableDataProps {
    signal: AbortSignal | undefined;
    page: number;
    pageSize?: number;
    searchParams: SearchParams;
}
