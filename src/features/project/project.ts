import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';

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
    useFetchProjectsQuery , useStoreProjectMutation, useDeleteProjectMutation , useUpdateProjectMutation} = projectSlice;

