export interface PRODUCT {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}
export interface RESPONSE_SEARCH_PRODUCT_BY_ID {
    status: boolean;
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
    date_release?: string;
    date_revision?: string;
}
