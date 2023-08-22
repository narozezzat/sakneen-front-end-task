export interface Listing {
    id: number;
    for_sale: string;
    photos: string[];
    unit_id: string;
    total_price: number;
    unit_type: string;
    bua: number;
}

export type Query = {
    page?: number;
    search?: string|null;
    limit?: number;
    order?: 'asc' | 'desc'| null| undefined,
    sort?: string|null,
};
