import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Access } from '../access/access';
import { Project } from '../project/project';

export class Responsable {
    constructor(id=0,name:string,email:string,phone:string,projects:Project[]) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.projects = projects;

    }
    id: number;
    name: string;
    email: string;
    phone:string;
    projects:Project[];

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
        fetchLinkedAccess: builder.query<Access[], number>({
            query: (id) => {return `getLinkedAccess/${id}`} 

        }),
        getResponsable:builder.query<Responsable,number>({
            query:(id)=>({
                url: `responsable/${id}`,
                method: 'GET',
            })
        }),
        storeResponsable: builder.mutation<StandarResponse, Responsable>({
            query: (credentials) => ({
                url: "responsable",
                method: 'post',
                body: {
                    name: credentials.name,
                    email: credentials.email,
                    phone: credentials.phone
                 
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
                    phone: responsable.phone
                  
                },
            }),

        }),
        linkAccess: builder.mutation<StandarResponse, {id:number,access:number[]}>({
            query: (params) => ({
                url: `linkAccess/${params.id}`,
                method: 'POST',
                body: {
                    access:params.access
                }
            }),

        }),
      

    })

})
export const {
    useFetchResponsablesQuery , useGetResponsableQuery, useFetchLinkedAccessQuery, useLinkAccessMutation ,useStoreResponsableMutation, useDeleteResponsableMutation , useUpdateResponsableMutation} = responsableSlice;

