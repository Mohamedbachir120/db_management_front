import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { PasswordResponse, StandarResponse } from '../../app/services/standardResponse';
import { Privillege } from '../privillege/privillege';

export class Access {
    constructor(id=0,username:string,pwd="",auth_type:number) {

        this.id = id;
        this.username = username;
        this.pwd = pwd;
        this.auth_type = auth_type;
       

    }
    id: number;
    username: string;
    pwd: string;
    auth_type: number;
 

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Access> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Access[]
  }



export const accessSlice = createApi({
    reducerPath: 'access',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchAccesss: builder.query<ListResponse<Access>,{keyword:string,page:number}>({
            query: (params) => {return `/access?page=${params.page}&keyword=${params.keyword}`;},

        }),
        getAccess:builder.query<Access,number>({
            query:(id)=>({
                url: `access/${id}`,
                method: 'GET',
            })
        }),
        fetchLinkedPrivillege: builder.query<Privillege[], number>({
            query: (id) => {return `access/getLinkedPrevillege/${id}`} 

        }),
        storeAccess: builder.mutation<StandarResponse, Access>({
            query: (credentials) => ({
                url: "access",
                method: 'post',
                body: {
                    username: credentials.username,
                    pwd: credentials.pwd,
                    auth_type: credentials.auth_type,
                 
                },
                

            }),

        }),
        deleteAccess: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `access/${id}`,
                method: 'DELETE',
            }),

        }),
        updateAccess: builder.mutation<StandarResponse, Access>({
            query: (access) => ({
                url: `access/${access.id}`,
                method: 'POST',
                body: {
                    username: access.username,
                    pwd: access.pwd,
                    auth_type: access.auth_type,
                  
                },
            }),

        }),
        linkPrivillege: builder.mutation<StandarResponse, {id:number,previlleges:number[]}>({
            query: (params) => ({
                url: `access/linkPrevillege/${params.id}`,
                method: 'POST',
                body: {
                    previlleges:params.previlleges
                }
            }),

        }),
        decryptPassword:builder.mutation<PasswordResponse,{id:number,password:String}>({
            query: (params) => ({
                url:`auth/getPassword/${params.id}`,
                method: 'POST',
                body: {
                    password:params.password
                }
            })
        })
      
      

    })

})
export const {
    useFetchAccesssQuery, useDecryptPasswordMutation ,useFetchLinkedPrivillegeQuery,useGetAccessQuery,useLinkPrivillegeMutation, useStoreAccessMutation, useDeleteAccessMutation , useUpdateAccessMutation} = accessSlice;

