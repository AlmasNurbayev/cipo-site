import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url } from '../app/product.api';

export const subscribeApi = createApi({
    reducerPath: 'subscribeApi',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        createSubscribe: build.mutation({
            query(body) {
                 return {
                    url: `/api/postSubscribe`,
                    method: 'POST',
                    body
                }
        },
            invalidatesTags: ['Post'],
        })
    })
})

export const subscribeGetApi = createApi({
    reducerPath: 'getSubscribe',
    baseQuery: fetchBaseQuery({ baseUrl: backend_url }),
    endpoints: (builder) => ({
        getSubscribe: builder.query({ query: (count) => `api/subscribes` })
    })
})

export const { useGetSubscribeQuery } = subscribeGetApi;
export const { useCreateSubscribeMutation } = subscribeApi;
