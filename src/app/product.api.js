'useStrict';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backend_url = 'http://localhost:3001';

export const productApi = createApi({
    reducerPath: 'productsNews',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        productsNews: builder.query({ query: (count) => `api/productsNews?news=${count}` })
    })
})

export const newsApi = createApi({
    reducerPath: 'News',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        News: builder.query({ query: (count) => `api/news?news=${count}` })
    })
})

export const storesApi = createApi({
    reducerPath: 'Stores',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        Stores: builder.query({ query: (count) => `api/stores` })
    })
})

export const filtersApi = createApi({
    reducerPath: 'Filters',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        Filters: builder.query({ query: () => `api/productsFilter` })
    })
})

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        products: builder.query({
            query: (obj) => {
                //console.log('size in useProductsQuery ' + size);
                return {
                    url: `api/products`,
                    method: 'GET',
                    params: { ...obj}
                }
            }
        }
        )
    })
})

export const { useProductsNewsQuery } = productApi;
export const { useNewsQuery } = newsApi;
export const { useStoresQuery } = storesApi;
export const { useFiltersQuery } = filtersApi;
export const { useProductsQuery } = productsApi;