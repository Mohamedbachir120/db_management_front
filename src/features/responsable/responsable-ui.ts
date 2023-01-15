import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Responsable } from "./responsable";
export class ResponsableUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,responsable:Responsable,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.responsable = responsable;
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
    responsable:Responsable;
    isDeleted:boolean;
  
}

const initialState:ResponsableUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    responsable: new Responsable(0,"","","")


    

   
  
};

const responsableUiSlice = createSlice({
    name: "responsableUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.responsable = action.payload;
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
        setName(state,action){
            state.responsable.name = action.payload;
        },
        setEmail(state,action){
            state.responsable.email = action.payload;
        },
        setPhone(state,action){
            state.responsable.phone = action.payload;
        },
       
        
    }
})

export const { show , hide ,setName,setEmail,setPhone ,showEdit, setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = responsableUiSlice.actions;
export default responsableUiSlice.reducer;


