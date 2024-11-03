export interface TableData<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
}
