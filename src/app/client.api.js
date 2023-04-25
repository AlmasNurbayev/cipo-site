import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url_crm } from '../app/product.api';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: backend_url_crm }),
  tagTypes: [],
  endpoints: (build) => ({
    createClient: build.mutation({
      query(body) {
        return {
          url: `/api/client/create`,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },          
          method: 'POST',
          body
        }
      }
      })
    ,
      getAllClient: build.query({
        query: (obj) => {
          return {
            url: `api/client/all2`,
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'GET',
            params: { ...obj }
          }
        }
      })
    
  })
})



export const { useCreateClientMutation } = clientApi;
export const { useGetAllClientQuery } = clientApi;
