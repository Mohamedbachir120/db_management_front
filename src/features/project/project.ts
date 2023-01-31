import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Bdd } from '../bdd/bdd';
import { Responsable } from '../responsable/responsable';
import { Population } from '../population/population';

export class Project {
    constructor(id=0,name:string,description:string) {

        this.id = id;
        this.name = name;
        this.description = description;
       

    }
    id: number;
    name: string;
    description: string;
 

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Project> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Project[]
  }



export const projectSlice = createApi({
    reducerPath: 'project',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchProjects: builder.query<ListResponse<Project>,{keyword:string,page:number}>({
            query: (params) => {return `/project?page=${params.page}&keyword=${params.keyword}`;},

        }),
        fetchLinkedDb: builder.query<Bdd[], number>({
            query: (id) => {return `getLinkedDb/${id}`} 

        }),
        fetchLinkedResponsables: builder.query<Responsable[], number>({
            query: (id) => {return `getLinkedResponsables/${id}`} 

        }),
        fetchLinkedPopulations: builder.query<Population[], number>({
            query: (id) => {return `getLinkedPopulations/${id}`} 

        }),
        getProject:builder.query<Project,number>({
            query:(id)=>({
                url: `project/${id}`,
                method: 'GET',
            })
        }),
        storeProject: builder.mutation<StandarResponse, Project>({
            query: (credentials) => ({
                url: "project",
                method: 'post',
                body: {
                    name: credentials.name,
                    description: credentials.description,
                 
                },
                

            }),

        }),
        deleteProject: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `project/${id}`,
                method: 'DELETE',
            }),

        }),
      
        linkDB: builder.mutation<StandarResponse, {id:number,db:number[]}>({
            query: (params) => ({
                url: `linkDB/${params.id}`,
                method: 'POST',
                body: {
                    databases:params.db
                }
            }),

        }),
        linkResponsable: builder.mutation<StandarResponse, {id:number,responsables:number[]}>({
            query: (params) => ({
                url: `linkResponsable/${params.id}`,
                method: 'POST',
                body: {
                    responsables:params.responsables
                }
            }),

        }),
        linkPopulation: builder.mutation<StandarResponse, {id:number,populations:number[]}>({
            query: (params) => ({
                url: `linkPopulation/${params.id}`,
                method: 'POST',
                body: {
                    populations:params.populations
                }
            }),

        }),
        updateProject: builder.mutation<StandarResponse, Project>({
            query: (project) => ({
                url: `project/${project.id}`,
                method: 'POST',
                body: {
                    name: project.name,
                    description: project.description,
                  
                },
            }),

        }),
      

    })

})
export const {
    useFetchProjectsQuery,useLinkPopulationMutation,useLinkResponsableMutation,useFetchLinkedPopulationsQuery,useFetchLinkedResponsablesQuery ,useGetProjectQuery, useFetchLinkedDbQuery, useLinkDBMutation ,useStoreProjectMutation, useDeleteProjectMutation , useUpdateProjectMutation} = projectSlice;

