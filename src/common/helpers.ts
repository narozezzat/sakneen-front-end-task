export function removeKeysWithNullableValues<T>(query: T|any): Partial<T|any> {
    const newObj: { [key: string]: any } = {};

    Object.keys(query).forEach((key) => {
        if (query[key]) {
            newObj[key] = query[key];
        }
    });

    return newObj;
}


// Covert Object {limit: 10, page: 1} to query string  page=1&limit=10
export function transformObjectToQueryString<T>(query: T): string {
    const newQuery = removeKeysWithNullableValues(query);

    const queryParams = [];

    for (const key in newQuery) {
      if (newQuery.hasOwnProperty(key)) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(newQuery[key])}`);
      }
    }
  
    return queryParams.join('&');
}
