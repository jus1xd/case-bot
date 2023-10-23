// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ISkin} from "../../models/ISkin.ts";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface ISkinsResponse {
    status: string,
    skins: ISkin[]
}

interface ISkinResponse {
    status: string,
    skin: ISkin
}

export const skinsApi = createApi({
    reducerPath: "skinsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getSkins: builder.query<ISkinsResponse, string>({
            query: (token) => ({
                url: `/skins/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        createSkin: builder.mutation<ISkinResponse, { token: string, body: ISkin }>({
            query: ({token, body}) => ({
                url: `/skins/create/`,
                method: "DELETE",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        getSkinById: builder.query<ISkinResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/skins/${id}/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        deleteSkinById: builder.mutation<ISkinResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/skins/${id}/delete/`,
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        editSkinById: builder.mutation<ISkinResponse, { body: ISkin, token: string, id: number }>({
            query: ({token, body, id}) => ({
                url: `/skins/${id}/patch/`,
                method: "PATCH",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
    }),
});