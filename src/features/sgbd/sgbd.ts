import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';

export class Sgbd {
    constructor(id=0,name:string,version:string) {

        this.id = id;
        this.name = name;
        this.version = version;
       

    }
    id: number;
    name: string;
    version: string;
 

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Sgbd> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Sgbd[]
  }



export const sgbdSlice = createApi({
    reducerPath: 'sgbd',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchSgbds: builder.query<ListResponse<Sgbd>,{keyword:string,page:number}>({
            query: (params) => {return `/sgbd?page=${params.page}&keyword=${params.keyword}`;},

        }),
        storeSgbd: builder.mutation<StandarResponse, Sgbd>({
            query: (credentials) => ({
                url: "sgbd",
                method: 'post',
                body: {
                    name: credentials.name,
                    version: credentials.version,
                 
                },
                

            }),

        }),
        deleteSgbd: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `sgbd/${id}`,
                method: 'DELETE',
            }),

        }),
        updateSgbd: builder.mutation<StandarResponse, Sgbd>({
            query: (sgbd) => ({
                url: `sgbd/${sgbd.id}`,
                method: 'POST',
                body: {
                    name: sgbd.name,
                    version: sgbd.version,
                  
                },
            }),

        }),
      

    })

})
export const {
    useFetchSgbdsQuery , useStoreSgbdMutation, useDeleteSgbdMutation , useUpdateSgbdMutation} = sgbdSlice;

