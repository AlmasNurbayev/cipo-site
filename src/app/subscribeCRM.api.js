import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url_crm } from '../app/product.api';

export const subscribeCRMApi = createApi({
  reducerPath: 'subscribeCRMApi',
  baseQuery: fetchBaseQuery({ baseUrl: backend_url_crm }),
  tagTypes: [],
  endpoints: (build) => ({
    createSubscribe: build.mutation({
      query(body) {
        return {
          url: `/api/subscribe/create`,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },          
          method: 'POST',
          body
        }
      }
      }),
      patchSubscribe: build.mutation({
        query(body) {
          return {
            url: '/api/subscribe/'+ String(body.id),
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },          
            method: 'PATCH',
            body
          }
        }
        }),  
        deleteSubscribe: build.mutation({
          query(id) {
            return {
              url: '/api/subscribe/'+ String(id),
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },          
              method: 'DELETE',
            }
          }
          })
        ,     
        deleteSubscribeID: build.mutation({
          query(id) {
            return {
              url: '/api/subscribe/client/'+ String(id),
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },          
              method: 'DELETE',
            }
          }
          })
        ,          
        getAllSubscribe: build.query({
          query: (obj) => {
            return {
              url: `api/subscribe/all`,
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },
              method: 'GET',
              params: { ...obj }
            }
          }
        }),               
    
  })
})


export const { useCreateSubscribeMutation } = subscribeCRMApi;
export const { usePatchSubscribeMutation } = subscribeCRMApi;
export const { useDeleteSubscribeMutation } = subscribeCRMApi;
export const { useDeleteSubscribeIDMutation } = subscribeCRMApi;
export const { useGetAllSubscribeQuery } = subscribeCRMApi;

