import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';

export class Responsable {
    constructor(id=0,name:string,email:string,phone:string) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;

    }
    id: number;
    name: string;
    email: string;
    phone:string;

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Responsable> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Responsable[]
  }



export const responsableSlice = createApi({
    reducerPath: 'responsable',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchResponsables: builder.query<ListResponse<Responsable>,{keyword:string,page:number}>({
            query: (params) => {return `/responsable?page=${params.page}&keyword=${params.keyword}`;},

        }),
        storeResponsable: builder.mutation<StandarResponse, Responsable>({
            query: (credentials) => ({
                url: "responsable",
                method: 'post',
                body: {
                    name: credentials.name,
                    email: credentials.email,
                 
                },
                

            }),

        }),
        deleteResponsable: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `responsable/${id}`,
                method: 'DELETE',
            }),

        }),
        updateResponsable: builder.mutation<StandarResponse, Responsable>({
            query: (responsable) => ({
                url: `responsable/${responsable.id}`,
                method: 'POST',
                body: {
                    name: responsable.name,
                    email: responsable.email,
                  
                },
            }),

        }),
      

    })

})
export const {
    useFetchResponsablesQuery , useStoreResponsableMutation, useDeleteResponsableMutation , useUpdateResponsableMutation} = responsableSlice;

