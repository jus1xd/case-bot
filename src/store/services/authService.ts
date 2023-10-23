// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthUser } from "../../models/IUser";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        loginUser: builder.mutation<string, string>({
            query: (token) => ({
                url: `/auth/`,
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        getToken: builder.mutation<{token: string}, IAuthUser>({
            query: (user) => ({
                url: `/token/`,
                method: "POST",
                mode: "cors",
                body: user
            }),
        }),
    }),
});