

export class Pagination {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemsPerPage: number;
    page: number;
    totalItems: number;
    totalPages: number;

    constructor(data : Pagination)
    {
        this.hasNextPage = data.hasNextPage;
        this.hasPreviousPage = data.hasPreviousPage;
        this.itemsPerPage = data.itemsPerPage;
        this.page = data.page;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
    }
}