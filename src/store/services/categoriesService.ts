// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICategory} from "../../models/ICategory.ts";

// Define a service using a base URL and expected endpoints
const baseUrl = "http://a1160b57c96.vps.myjino.ru:49423" || import.meta.env.API_BASE_URL;

interface ICategoriesResponse {
    status: string,
    categories: ICategory[]
}

interface ICategoryResponse {
    status: string,
    case: ICategory
}

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoriesResponse, string>({
            query: (token) => ({
                url: `/category/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            providesTags: ['Categories']
        }),
        createCategory: builder.mutation<ICategoryResponse, { token: string, body: ICategory }>({
            query: ({token, body}) => ({
                url: `/category/create/`,
                method: "POST",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Categories']
        }),
        getCategoryById: builder.query<ICategoryResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/category/${id}/`,
                method: "GET",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
        }),
        deleteCategoryById: builder.mutation<ICategoryResponse, { token: string, id: number }>({
            query: ({token, id}) => ({
                url: `/category/${id}/delete/`,
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Categories']
        }),
        editCategoryById: builder.mutation<ICategoryResponse, { body: ICategory, token: string, id: number }>({
            query: ({token, body, id}) => ({
                url: `/category/${id}/patch/`,
                method: "PATCH",
                mode: "cors",
                body: body,
                headers: {
                    "Authorization": `Token ${token}`
                }
            }),
            invalidatesTags: ['Categories']
        }),
    }),
});