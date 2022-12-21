import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface  Credential {
    id:number,
    name:string,
    token:string
}
interface loginParams{
    email:string,
    password:string

}
const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://10.80.100.252:8000/api/auth'

    }),
    endpoints: (builder) => {
       return {
        login:builder.query<Credential,loginParams>({
            query(loginParams){
                return "/login";
            }
        })
       }
    }

})
