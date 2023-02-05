import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Population } from '../population/population';

export class Server {
    constructor(id=0,dns:string,ip:string,OSversion:string,instance_name:string,port:string) {

        this.id = id;
        this.dns = dns;
        this.ip = ip;
        this.OSversion = OSversion;
        this.instance_name = instance_name;
        this.port = port;
        this.dns2 = "";
        this.creation_date = "";
        this.bdds_count = 0;

    }
    id: number;
    dns: string;
    ip: string;
    OSversion: string;
    instance_name: string;
    port:string;
    dns2:string|null;
    creation_date: string;
    bdds_count:number;

}
export class ExtendedPopulation extends Population {
    constructor(id=0,designation:string,projects_count:number){
        super(id,designation);
        this.projects_count = projects_count;
        
    }

    
    projects_count: number;
}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Server> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Server[]
  }

export interface STATS{
    populations:ExtendedPopulation[]
    servers:Server[]
} 
  


export const serveurSlice = createApi({
    reducerPath: 'serveur',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchServers: builder.query<ListResponse<Server>,{keyword:string,page:number}>({
            query: (params) => {return `/server?page=${params.page}&keyword=${params.keyword}`;},

        }),
        fetchStats:builder.query<STATS,number>({
            query:(params) => {return `/stats`;}
        }),
        storeServer: builder.mutation<StandarResponse, Server>({
            query: (credentials) => ({
                url: "server",
                method: 'post',
                body: {
                    dns: credentials.dns,
                    ip: credentials.ip,
                    OSVersion: credentials.OSversion,
                    instance_name: credentials.instance_name,
                    port: credentials.port,
                },
                

            }),

        }),

        deleteServer: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `server/${id}`,
                method: 'DELETE',
            }),

        }),
        updateServer: builder.mutation<StandarResponse, Server>({
            query: (server) => ({
                url: `server/${server.id}`,
                method: 'POST',
                body: {
                    dns: server.dns,
                    ip: server.ip,
                    OSVersion: server.OSversion,
                    instance_name: server.instance_name,
                    port: server.port,
                },
            }),

        }),
      
      

    })

})
export const {
    useFetchServersQuery , useFetchStatsQuery,useStoreServerMutation, useDeleteServerMutation , useUpdateServerMutation} = serveurSlice;

