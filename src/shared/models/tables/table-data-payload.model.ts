import { SearchParams } from "./handle-operations.model";

export interface TableDataPayload {
    page: number;
    pageSize: number;
    searchParams: SearchParams;
}
