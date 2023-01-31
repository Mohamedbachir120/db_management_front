import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Access } from '../access/access';

export class Privillege {
    constructor(id=0,name:string,securable:string,withGrant:number) {

        this.id = id;
        this.name = name;
        this.securable = securable;
        this.withGrant = withGrant;

    }
    id: number;
    name: string;
    securable: string;
    withGrant:number;
 

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Privillege> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Privillege[]
  }



export const privillegeSlice = createApi({
    reducerPath: 'privillege',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchPrivilleges: builder.query<ListResponse<Privillege>,{keyword:string,page:number}>({
            query: (params) => {return `/previllege?page=${params.page}&keyword=${params.keyword}`;},

        }),
        getPrivillege:builder.query<Privillege,number>({
            query:(id)=>({
                url: `previllege/${id}`,
                method: 'GET',
            })
        }),
        fetchLinkedAccess: builder.query<Access[], number>({
            query: (id) => {return `previllege/getLinkedAccess/${id}`} 

        }),
        storePrivillege: builder.mutation<StandarResponse, Privillege>({
            query: (credentials) => ({
                url: "previllege",
                method: 'post',
                body: {
                    name: credentials.name,
                    securable: credentials.securable,
                 
                },
                

            }),

        }),
        deletePrivillege: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `previllege/${id}`,
                method: 'DELETE',
            }),

        }),
        updatePrivillege: builder.mutation<StandarResponse, Privillege>({
            query: (previllege) => ({
                url: `previllege/${previllege.id}`,
                method: 'POST',
                body: {
                    name: previllege.name,
                    securable: previllege.securable,
                  
                },
            }),

        }),
        linkAccess: builder.mutation<StandarResponse, {id:number,access:number[]}>({
            query: (params) => ({
                url: `previllege/linkAccess/${params.id}`,
                method: 'POST',
                body: {
                    access:params.access
                }
            }),

        }),
      

    })

})
export const {
    useFetchPrivillegesQuery ,useGetPrivillegeQuery,useFetchLinkedAccessQuery,useLinkAccessMutation, useStorePrivillegeMutation, useDeletePrivillegeMutation , useUpdatePrivillegeMutation} = privillegeSlice;

