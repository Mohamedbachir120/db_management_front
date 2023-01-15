import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./project";
export class ProjectUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,project:Project,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.project = project;
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
    project:Project;
    isDeleted:boolean;
  
}

const initialState:ProjectUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    project: new Project(0,"","")


    

   
  
};

const projectUiSlice = createSlice({
    name: "projectUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.project = action.payload;
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
            state.project.name = action.payload;
        },
        setDescription(state,action){
            state.project.description = action.payload;
        },
       
        
    }
})

export const { show , hide ,setName,setDescription,showEdit, setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = projectUiSlice.actions;
export default projectUiSlice.reducer;


