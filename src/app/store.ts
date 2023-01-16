import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "../features/login/login";
import authReducer from "../features/auth/auth-slice";
import serverUiSlice from "../features/serveur/server-ui";
import accessUiSlice from "../features/access/access-ui";
import sgbdUiSlice from "../features/sgbd/sgbd-ui";
import projectUiSlice from "../features/project/project-ui";
import responsableUiSlice from "../features/responsable/responsable-ui";
import populationUiSlice from "../features/population/population-ui";
import bddUiSlice from "../features/bdd/bdd-ui";

import { serveurSlice } from "../features/serveur/serveur";
import { accessSlice } from "../features/access/access";
import { sgbdSlice } from "../features/sgbd/sgbd";
import { projectSlice } from "../features/project/project";
import { responsableSlice } from "../features/responsable/responsable";
import { bddSlice } from "../features/bdd/bdd";
import { linkedServerSlice } from "../features/linked-server/linked-server";
import { populationSlice } from "../features/population/population";
import linkedServerUiSlice from "../features/linked-server/linked-server-ui";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        serverUi: serverUiSlice,
        linkedServerUi:linkedServerUiSlice,
        accessUi: accessUiSlice,
        sgbdUi: sgbdUiSlice,
        projectUi: projectUiSlice,
        responsableUi: responsableUiSlice,
        populationUi: populationUiSlice,
        bddUi: bddUiSlice,



        [apiSlice.reducerPath]:apiSlice.reducer,
        [serveurSlice.reducerPath]:serveurSlice.reducer,
        [linkedServerSlice.reducerPath]:linkedServerSlice.reducer,
        [accessSlice.reducerPath]:accessSlice.reducer,
        [sgbdSlice.reducerPath]:sgbdSlice.reducer,
        [projectSlice.reducerPath]:projectSlice.reducer,
        [responsableSlice.reducerPath]:responsableSlice.reducer,
        [populationSlice.reducerPath]:populationSlice.reducer,
        [bddSlice.reducerPath]:bddSlice.reducer






    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false}).concat(
                apiSlice.middleware,
                serveurSlice.middleware,
                linkedServerSlice.middleware,
                accessSlice.middleware,
                sgbdSlice.middleware,
                accessSlice.middleware,
                projectSlice.middleware,
                responsableSlice.middleware,
                populationSlice.middleware,
                bddSlice.middleware);
    }

});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
