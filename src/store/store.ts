import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authApi } from "./services/authService";
import {usersApi} from "./services/usersService.ts";
import {skinsApi} from "./services/skinsService.ts";
import { casesApi } from "./services/casesService.ts";
import {categoriesApi} from "./services/categoriesService.ts";
import {vipApi} from "./services/vipService.ts";
import {youtuberApi} from "./services/youtuberService.ts";

export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [skinsApi.reducerPath]: skinsApi.reducer,
    [casesApi.reducerPath]: casesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [vipApi.reducerPath]: vipApi.reducer,
    [youtuberApi.reducerPath]: youtuberApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                authApi.middleware,
                usersApi.middleware,
                skinsApi.middleware,
                casesApi.middleware,
                categoriesApi.middleware,
                vipApi.middleware,
                youtuberApi.middleware
            ),
        devTools: true,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];