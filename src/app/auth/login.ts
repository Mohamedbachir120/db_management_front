import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface  Credential {
    id:number,
    name:string,
    token:string
}
 export  class loginParams{
    constructor(email:string,password:string){
        this.email = email;
        this.password = password;
    }
    email:string;
    password:string;

}
export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://10.80.100.252:8000/api/auth'

    }),
    endpoints: (builder) => ({
       
        login:builder.mutation<Credential,loginParams>({
            query:(credentials) =>({
                url:"/login",
                method:'post',
                body:{
                    email:credentials.email,
                    password:credentials.password
                }

            })
        })
       
    })

})
export const {
useLoginMutation} = apiSlice;

