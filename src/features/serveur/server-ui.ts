import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Server } from "./serveur";
export class ServerUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,server:Server,showConfirmationMessage:boolean,isDeleted:boolean)  {
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
    server:Server;
    isDeleted:boolean;
  
}

const initialState:ServerUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    server: new Server("","","","","")


    

   
  
};

const serverUiSlice = createSlice({
    name: "serverUi",
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
        
        hide (state)  {
            
            state.show = false;
            
        },
        showConfirmationMessage(state){
           
            state.showConfirmationMessage = true;
        },
        setDns(state,action){
            state.server.dns = action.payload;
        },
        setPort(state,action){
            state.server.port = action.payload;
        },
        setIp(state,action){
            state.server.ip = action.payload;
        },
        setOSVersion(state,action){
            state.server.OSversion = action.payload;
        },
        setInstance(state,action){
            state.server.instance_name = action.payload;
        }
        
    }
})

export const { show , hide ,setDns,setInstance,setIp,setOSVersion,setPort  ,showEdit, setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = serverUiSlice.actions;
export default serverUiSlice.reducer;


