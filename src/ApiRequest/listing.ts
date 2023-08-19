import { Listing, Query } from "@/common/types";

export async function getListings(query:Query={}) {
    try {
        const {page, search, limit} =query;
        let endpoint= 'http://localhost:3005/listings'
        
        if(search) {
            endpoint += `?unit_id_like=${search}`
        }
        if(limit) {
            endpoint += `&_limit=${limit}`
        }

        const response = await fetch(`${endpoint}?_page=${page}`);
        const listings: Listing[] = await response.json();
        return listings;
    } catch (error) {
        return [];
    }
}