export interface Listing {
    id: number;
    for_sale: string;
    photos: string[];
    unit_id: string;
    total_price: number;
    unit_type: string;
    bua: number;
}

export interface SalesPageProps {
    listings: Listing[];
}


export type Query = {
    page?: number;
    search?: string;
    limit?: number;
};
