// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IVip} from "../../models/IVip.ts";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface IVipResponse {
    status: string,
    vip: IVip
}

export const vipApi = createApi({
    reducerPath: "vipApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Vip"],
    endpoints: (builder) => ({
        getVip: builder.query<IVipResponse, string>({
            query: (token) => ({
                url: `/vip/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            providesTags: ['Vip']
        }),
        editVip: builder.mutation<IVip, { token: string, body: IVip }>({
            query: ({token, body}) => ({
                url: `/vip/edit/`,
                method: "PATCH",
                mode: "cors",
                body,
                headers: {
                    "Authorization": `Token ${token}`
                },
            }),
            invalidatesTags: ['Vip']
        }),
    }),
});