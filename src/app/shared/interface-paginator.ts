export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Sort2 {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}

export interface GeneralPage {
    data: any;
    content: any[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    numbers: number;
    sort: Sort2;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
export interface TableColumn{
    field: string;
    header: string;
    visibility: boolean; 
    formatoFecha?: string;   
}