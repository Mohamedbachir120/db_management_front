import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./auth/login";

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,

    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
