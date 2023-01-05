import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "../features/login/login";
import authReducer from "../features/auth/auth-slice";
import serverUiSlice from "../features/serveur/server-ui";


import { serveurSlice } from "../features/serveur/serveur";
import { linkedServerSlice } from "../features/linked-server/linked-server";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        serverUi: serverUiSlice,
        [apiSlice.reducerPath]:apiSlice.reducer,
        [serveurSlice.reducerPath]:serveurSlice.reducer,
        [linkedServerSlice.reducerPath]:linkedServerSlice.reducer


    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware,serveurSlice.middleware,linkedServerSlice.middleware);
    }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
