import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../app/constantes/const';

export interface Server {
    id: number,
    dns: string,
    ip: string,
    OSversion: string,
    instance_name: string,
    port:string,
    dns2:string|null,
    creation_date: string,
    bdds_count:number

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

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//     args,
//     api,
//     extraOptions
// ) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error && result.error.status === 401) {
//         const refreshResult = await baseQuery('token/refresh/', api, extraOptions);

//         if (refreshResult.data) {
//             api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }));

//             // retry the initial query
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }
//     return result;
// };

export const serveurSlice = createApi({
    reducerPath: 'serveur',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                
              headers.set('authorization', `Bearer ${token}`);
              headers.set('Accept', 'application/json');


            }
        
            return headers
          },
        

    }),
    endpoints: (builder) => ({

        fetchServers: builder.query<ListResponse<Server>,{keyword:string,page:number}>({
            query: (params) => {return `/server?page=${params.page}&keyword=${params.keyword}`;},

        })


    })

})
export const {
    useFetchServersQuery  } = serveurSlice;

