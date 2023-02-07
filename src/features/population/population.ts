import {  createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../app/services/baseQuery';
import { StandarResponse } from '../../app/services/standardResponse';
import { Project } from '../project/project';

export class Population {
    constructor(id=0,designation:string,projects:Project[]) {

        this.id = id;
        this.designation = designation;
        this.projects = projects;
       

    }
    id: number;
    designation: string;
    projects:Project[];
 

}
export interface Page{
    active:boolean
    url:string
    label:string

}
export interface ListResponse<Population> {
    page: number
    per_page: number
    total: number
    links:Page[]
    total_pages: number
    data: Population[]
  }



export const populationSlice = createApi({
    reducerPath: 'population',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        fetchPopulations: builder.query<ListResponse<Population>,{keyword:string,page:number}>({
            query: (params) => {return `/population?page=${params.page}&keyword=${params.keyword}`;},

        }),
        storePopulation: builder.mutation<StandarResponse, Population>({
            query: (credentials) => ({
                url: "population",
                method: 'post',
                body: {
                    designation: credentials.designation,
                 
                },
                

            }),

        }),
        deletePopulation: builder.mutation<StandarResponse, number>({
            query: (id) => ({
                url: `population/${id}`,
                method: 'DELETE',
            }),

        }),
        updatePopulation: builder.mutation<StandarResponse, Population>({
            query: (population) => ({
                url: `population/${population.id}`,
                method: 'POST',
                body: {
                    designation: population.designation,
                  
                },
            }),

        }),
      

    })

})
export const {
    useFetchPopulationsQuery , useStorePopulationMutation, useDeletePopulationMutation , useUpdatePopulationMutation} = populationSlice;

