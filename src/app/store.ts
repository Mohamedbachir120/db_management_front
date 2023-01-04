import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "../features/login/login";
import authReducer from "../features/auth/auth-slice";
import { serveurSlice } from "../features/serveur/serveur";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        [serveurSlice.reducerPath]:serveurSlice.reducer


    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware,serveurSlice.middleware);
    }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
