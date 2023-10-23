// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICase} from "../../models/ICase.ts";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface ICasesResponse {
    status: string,
    cases: ICase[]
}

interface ICaseResponse {
    status: string,
    case: ICase
}

export const casesApi = createApi({
    reducerPath: "casesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Cases"],
    endpoints: (builder) => ({
        getCases: builder.query<ICasesResponse, string>({
            query: (token) => ({
                url: `/cases/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            providesTags: ['Cases']
        }),
        createCase: builder.mutation<ICaseResponse, { token: string, body: ICase }>({
            query: ({token, body}) => ({
                url: `/cases/create/`,
                method: "DELETE",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        getCaseById: builder.query<ICaseResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/cases/${id}/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        deleteCaseById: builder.mutation<ICaseResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/cases/${id}/delete/`,
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        editCaseById: builder.mutation<ICaseResponse, { body: FormData, token: string, id: number }>({
            query: ({token, body, id}) => ({
                url: `/cases/${id}/patch/`,
                method: "PATCH",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Cases']
        }),
    }),
});