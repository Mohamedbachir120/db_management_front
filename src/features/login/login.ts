import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { AuthState, setCredentials, signOut } from '../auth/auth-slice';
import { store } from '../../app/store';

interface Credential {
    id: number,
    name: string,
    token: string
}
interface LogoutResponse{
    success:boolean
}
export class loginParams {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    email: string;
    password: string;

}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.127:8000/api/auth',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
        
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
        
            return headers
          },
        

    }),
    endpoints: (builder) => ({

        login: builder.mutation<Credential, loginParams>({
            query: (credentials) => ({
                url: "/login",
                method: 'post',
                body: {
                    email: credentials.email,
                    password: credentials.password
                },
                

            }),

        }),
        logout: builder.mutation<LogoutResponse,string>({
            query: () => ({
                url: "/logout",
                method: 'post',

            }),
           
            onQueryStarted(arg, api) {
                store.dispatch(signOut());
                
            },

           

        }),


    })

})
export const {
    useLoginMutation , useLogoutMutation } = apiSlice;

