import { baseUrl } from '../../app/constantes/const';
import { RootState, store } from '../../app/store';
import { AuthState, setCredentials, signOut } from './../../features/auth/auth-slice';
import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credential } from '../../features/login/login'; 
export const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token');
        
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            
          headers.set('authorization', `Bearer ${token}`);
          headers.set('Accept', 'application/json');


        }
    
        return headers
      },
      
});
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown , FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    

    
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const {data} = await baseQuery({
            
            url: 'auth/refresh/',
            method: 'POST', 

          }, api,  extraOptions );
          try {
          
            const credential:Credential = data as Credential;
            store.dispatch(setCredentials(new AuthState(true,credential.token,credential.name,credential.id)));
            
            result = await baseQuery(args, api, extraOptions);

          } catch (error) {
            store.dispatch(signOut());
            
          }
        
    }
    return result;
};