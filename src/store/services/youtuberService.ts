// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IYoutuber} from "../../models/IYoutuber.ts";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface IYoutuberResponse {
    status: string,
    youtuber: IYoutuber
}

export const youtuberApi = createApi({
    reducerPath: "youtuberApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Youtuber"],
    endpoints: (builder) => ({
        getYoutuber: builder.query<IYoutuberResponse, string>({
            query: (token) => ({
                url: `/youtuber/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            providesTags: ['Youtuber']
        }),
        editYoutuber: builder.mutation<IYoutuber, { token: string, body: IYoutuber }>({
            query: ({token, body}) => ({
                url: `/youtuber/edit/`,
                method: "PATCH",
                mode: "cors",
                body,
                headers: {
                    "Authorization": `Token ${token}`
                },
            }),
            invalidatesTags: ['Youtuber']
        }),
    }),
});