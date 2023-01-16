import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Server } from '../serveur/serveur';
import { Sgbd } from '../sgbd/sgbd';

export class Bdd {
    constructor(id=0,name:string,engine:string,status:string,creation_date="",server:Server,sgbd:Sgbd,server_id=0,sgbd_id=0) {

        this.id = id;
        this.name = name;
        this.engine = engine;
        this.status = status;
        this.creation_date = creation_date;
        this.server = server;
        this.sgbd = sgbd;
        this.server_id = server_id;;
        this.sgbd_id = sgbd_id;



    }
    id: number;
    name: string;
    engine: string;
    status: string;
    creation_date: string;
    server:Server;
    sgbd:Sgbd;
    server_id:number;
    sgbd_id:number;


}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Bdd> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Bdd[]
  }



export const bddSlice = createApi({
    reducerPath: 'bdd',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchBdds: builder.query<ListResponse<Bdd>,{keyword:string,page:number}>({
            query: (params) => {return `/bdd?page=${params.page}&keyword=${params.keyword}`;},

        }),
        storeBdd: builder.mutation<StandarResponse, Bdd>({
            query: (bdd) => ({
                url: "bdd",
                method: 'post',
                body: {
                    name: bdd.name,
                    engine: bdd.engine,
                    status: bdd.status,
                    creation_date: bdd.creation_date,
                    server_id: bdd.server_id,
                    sgbd_id: bdd.sgbd_id,

                },
                

            }),

        }),
        deleteBdd: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `bdd/${id}`,
                method: 'DELETE',
            }),

        }),
        updateBdd: builder.mutation<StandarResponse, Bdd>({
            query: (bdd) => ({
                url: `bdd/${bdd.id}`,
                method: 'POST',
                body: {
                    name: bdd.name,
                    engine: bdd.engine,
                    status: bdd.status,
                    creation_date: bdd.creation_date,
                    server_id: bdd.server_id,
                    sgbd_id: bdd.sgbd_id,
                },
            }),

        }),
      

    })

})
export const {
    useFetchBddsQuery , useStoreBddMutation, useDeleteBddMutation , useUpdateBddMutation} = bddSlice;

