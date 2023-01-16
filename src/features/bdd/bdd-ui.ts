import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Bdd } from "./bdd";
import { Server } from "../serveur/serveur";
import { initSgbd } from "../sgbd/sgbd-ui";


export const initServer = new Server(0,"","","","","");
export class BddUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,bdd:Bdd,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.bdd = bdd;
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
    bdd:Bdd;
    isDeleted:boolean;
  
}


const initialState:BddUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    bdd: new Bdd(0,"","","","",initServer,initSgbd,0,0)


    

   
  
};

const bddUiSlice = createSlice({
    name: "bddUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.bdd = action.payload;
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
            state.bdd.name = action.payload;
        },
        setStatus(state,action){
            state.bdd.status = action.payload;
        },
        setCreationDate(state,action){
            state.bdd.creation_date = action.payload;
        },
        setEngine(state,action){
            state.bdd.engine = action.payload;
        },
        setServer(state,action){
            state.bdd.server_id = action.payload;
        },
        setSgbd(state,action){
            state.bdd.sgbd_id = action.payload;
        },
        
        hide (state)  {
            
            state.show = false;
            
        },
        showConfirmationMessage(state){
           
            state.showConfirmationMessage = true;
        },
        
        
    }
})

export const { show , hide   ,showEdit,setName,setStatus,setEngine,setCreationDate , setSgbd , setServer ,setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = bddUiSlice.actions;
export default bddUiSlice.reducer;


