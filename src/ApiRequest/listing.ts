import { transformObjectToQueryString } from "@/common/helpers";
import { Listing, Query } from "@/common/types";

export async function getListings(query: Query = {}) {
    try {        
        let endpoint = 'http://localhost:3005/listings'

        const response = await fetch(`${endpoint}?${transformObjectToQueryString(query)}`);
        const listings: Listing[] = await response.json();

        return listings;
    } catch (error) {
        return [];
    }
}