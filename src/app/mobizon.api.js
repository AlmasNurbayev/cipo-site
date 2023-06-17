import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mobizon_url } from './product.api'


export const mobizonApi = createApi({
  reducerPath: 'mobizonApi',
  baseQuery: fetchBaseQuery({ baseUrl: mobizon_url }),
  tagTypes: [],
  endpoints: (build) => ({
    createCompaign: build.mutation({
      query: (body) => ({
        url: `service/campaign/create`,
        method: 'POST',
        // // prepareHeaders: async (headers) => {
        // //   headers.set('Content-Type', 'application/json')
        // //   headers.set('Connection', 'keep-alive')
        // //   headers.set('Access-Control-Allow-Origin', '*')
        // //   headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        // //   headers.set('Access-Control-Allow-Headers', 'Content-Type')
        // //   headers.set('credentials', 'same-origin')
        // //   return headers
        // // },
        // // credentials: "same-origin",
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Access-Control-Allow-Origin': '*'
        // //   'Content-Type': 'application/json;charset=UTF-8',
        // //   'Connection': 'keep-alive',
        // //   'Accept': '*/*',
        //  },             
        body: body,
        mode: 'no-cors',
        params: {
          apiKey: process.env.REACT_APP_MOBIZON_KEY,
          output: 'json',
        },
        //responseHandler: (response) => response.text(),
      }),
    }),
    addRecipients: build.mutation({
      query(body) {
        return {
          url: `service/Campaign/AddRecipients`,
          method: 'POST',
          body
        }
      }
    }),
    getCompaign: build.query({
      query: (obj) => {
        return {
          url: `service/Campaign/List`,
          method: 'GET',
          params: {
            apiKey: process.env.REACT_APP_MOBIZON_KEY,
            output: 'json'
          }
        }
      }
    }),
    getBalance: build.query({
      query: (obj) => {
        return {
          url: `service/user/getownbalance`,
          method: 'GET',
          params: {
            apiKey: process.env.REACT_APP_MOBIZON_KEY,
            output: 'json'
          }
        }
      }
    }),

  })
})

export const { useGetCompaignQuery } = mobizonApi;
export const { useGetBalanceQuery } = mobizonApi;
export const { useCreateCompaignMutation } = mobizonApi;
export const { useAddRecipientsMutation } = mobizonApi;