// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface IUsersResponse {
    status: string,
    users: IUser[]
}

interface IUserResponse {
    status: string,
    user: IUser
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersResponse, string>({
            query: (token) => ({
                url: `/users/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            providesTags: ['Users']
        }),
        getUserById: builder.query<IUserResponse, {token: string, id: number}>({
            query: ({token, id}) => ({
                url: `/users/${id}`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        deleteUserById: builder.mutation<IUserResponse, {token: string, id: number}>({
            query: ({token, id}) => ({
                url: `/users/${id}/delete/`,
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Users']
        }),
        editUserById: builder.mutation<IUserResponse, {body: IUser, token: string, id: number}>({
            query: ({token, body, id}) => ({
                url: `/users/${id}/patch/`,
                method: "PATCH",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Users']
        }),
    }),
});