import { createSlice } from "@reduxjs/toolkit";
import { Privillege } from "./privillege";

export const initPrivillege = new Privillege(0,"","",0);
export class PrivillegeUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,privillege:Privillege,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.privillege = privillege;
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
    privillege:Privillege;
    isDeleted:boolean;
  
}

const initialState:PrivillegeUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    privillege: new Privillege(0,"","",0)


    

   
  
};

const privillegeUiSlice = createSlice({
    name: "privillegeUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.privillege = action.payload;
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
            state.privillege.name = action.payload;
        },
        setSecurable(state,action){
            state.privillege.securable = action.payload;
        },
       
        
    }
})

export const { show , hide ,setName,setSecurable,showEdit, setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = privillegeUiSlice.actions;
export default privillegeUiSlice.reducer;


