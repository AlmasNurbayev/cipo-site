'useStrict';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const backend_url = 'http://localhost:3001';

export const productApi = createApi({
    reducerPath: 'productsNews',
    baseQuery: fetchBaseQuery({baseUrl: backend_url}),
    endpoints: (builder) => ({
        productsNews: builder.query({query: (count) => `api/productsNews?news=${count}`})
    })
})

export const {useProductsNewsQuery} = productApi;