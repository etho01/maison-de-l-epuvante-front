export interface PaginatedResponse<T> {
  'member': T[];
  'totalItems': number;
  'hydra:view'?: {
    '@id': string;
    'hydra:first'?: string;
    'hydra:last'?: string;
    'hydra:previous'?: string;
    'hydra:next'?: string;
  };
  pagination : Pagination;
}

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