import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "../features/login/login";
import authReducer from "../features/auth/auth-slice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,

    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware);
    }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
