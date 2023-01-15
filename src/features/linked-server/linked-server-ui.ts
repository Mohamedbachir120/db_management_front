import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { LinkedServer } from "./linked-server";
import { Server } from "../serveur/serveur";


export const initServer = new Server(0,"","","","","");
export class LinkedServerUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,server:LinkedServer,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.server = server;
            this.showConfirmationMessage = showConfirmationMessage;
            this.isDeleted = isDeleted;
            this.showEdit = showEdit;
         
    }
   
    show:boolean;
    showDetail:boolean;
    showEdit:boolean;
    showConfirmationMessage:boolean;
    created:boolean;
    isError:boolean;
    server:LinkedServer;
    isDeleted:boolean;
  
}


const initialState:LinkedServerUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    server: new LinkedServer(0,"","","","",initServer,initServer,0,0,0)


    

   
  
};

const linkedServerUiSlice = createSlice({
    name: "linkedServerUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.server = action.payload;
            state.showDetail = true;
        },
        showEdit(state){
            state.showEdit = true;
            
        },
        hideEdit(state){
            state.showEdit = false;
        },
        hideDetail(state){
            state.showDetail = false;
        },
        setCreated(state){
            state.created = true;
        },
        setError(state){
            state.isError = true;
        },
        initialize(){
           return  initialState;
            

        },
        setDeleted(state){
            state.isDeleted = true;
        },
        setName(state,action){
            state.server.name = action.payload;
        },
        setType(state,action){
            state.server.type = action.payload;
        },
        setCreationDate(state,action){
            state.server.creation_date = action.payload;
        },
        setCreateMethod(state,action){
            state.server.create_method = action.payload;
        },
        setSource(state,action){
            state.server.source_id = action.payload;
        },
        setDestination(state,action){
            state.server.destination_id = action.payload;
        },
        setAccess(state,action){
            state.server.access_id = action.payload;
        },
        hide (state)  {
            
            state.show = false;
            
        },
        showConfirmationMessage(state){
           
            state.showConfirmationMessage = true;
        },
        
        
    }
})

export const { show , hide   ,showEdit,setName,setType,setCreateMethod,setCreationDate, setAccess , setDestination , setSource ,setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = linkedServerUiSlice.actions;
export default linkedServerUiSlice.reducer;


