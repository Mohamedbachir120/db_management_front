import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Server } from '../serveur/serveur';

export class LinkedServer {
    constructor(id=0,name:string,create_method:string,type:string,creation_date="",source:Server,destination:Server,source_id=0,destination_id=0,access_id=0) {

        this.id = id;
        this.name = name;
        this.create_method = create_method;
        this.type = type;
        this.creation_date = creation_date;
        this.source = source;
        this.destination = destination;
        this.source_id = source_id;;
        this.destination_id = destination_id;
        this.access_id = access_id;



    }
    id: number;
    name: string;
    create_method: string;
    type: string;
    creation_date: string;
    source:Server;
    destination:Server;
    source_id:number;
    destination_id:number;
    access_id:number;


}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<LinkedServer> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: LinkedServer[]
  }



export const linkedServerSlice = createApi({
    reducerPath: 'linkedServer',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchLinkedServers: builder.query<ListResponse<LinkedServer>,{keyword:string,page:number}>({
            query: (params) => {return `/linked_server?page=${params.page}&keyword=${params.keyword}`;},

        }),
        storeLinkedServer: builder.mutation<StandarResponse, LinkedServer>({
            query: (linked_server) => ({
                url: "linked_server",
                method: 'post',
                body: {
                    name: linked_server.name,
                    create_method: linked_server.create_method,
                    type: linked_server.type,
                    creation_date: linked_server.creation_date,
                    source_id: linked_server.source_id,
                    destination_id: linked_server.destination_id,
                    access_id: linked_server.access_id

                },
                

            }),

        }),
        deleteLinkedServer: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `linked_server/${id}`,
                method: 'DELETE',
            }),

        }),
        updateLinkedServer: builder.mutation<StandarResponse, LinkedServer>({
            query: (linked_server) => ({
                url: `linked_server/${linked_server.id}`,
                method: 'POST',
                body: {
                    name: linked_server.name,
                    create_method: linked_server.create_method,
                    type: linked_server.type,
                    creation_date: linked_server.creation_date,
                    source_id: linked_server.source_id,
                    destination_id: linked_server.destination_id,
                    access_id: linked_server.access_id
                },
            }),

        }),
      

    })

})
export const {
    useFetchLinkedServersQuery , useStoreLinkedServerMutation, useDeleteLinkedServerMutation , useUpdateLinkedServerMutation} = linkedServerSlice;

