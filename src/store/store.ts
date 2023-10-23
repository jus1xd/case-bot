import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authApi } from "./services/authService";
import {usersApi} from "./services/usersService.ts";
import {skinsApi} from "./services/skinsService.ts";
import { casesApi } from "./services/casesService.ts";

export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [skinsApi.reducerPath]: skinsApi.reducer,
    [casesApi.reducerPath]: casesApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                authApi.middleware,
                usersApi.middleware,
                skinsApi.middleware,
                casesApi.middleware
            ),
        devTools: true,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];