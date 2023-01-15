import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Population } from "./population";
export class PopulationUiState{
    constructor (show:boolean,created:boolean,isError:boolean,showEdit:boolean,showDetail:boolean,population:Population,showConfirmationMessage:boolean,isDeleted:boolean)  {
            this.show = show;
            this.created = created;
            this.isError = isError;
            this.showDetail = showDetail;
            this.population = population;
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
    population:Population;
    isDeleted:boolean;
  
}

const initialState:PopulationUiState = {
    show: false ,
    created: false,
    isDeleted:false,
    isError: false,
    showDetail: false,
    showEdit:false,
    showConfirmationMessage:false,
    population: new Population(0,"")


    

   
  
};

const populationUiSlice = createSlice({
    name: "populationUi",
    initialState,
    reducers: {
        show (state)  {
            
            
           state.show = true;
           
        },
        showDetail(state,action){
            state.population = action.payload;
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
        setDesignation(state,action){
            state.population.designation = action.payload;
        },
        
       
        
    }
})

export const { show , hide ,setDesignation,showEdit, setCreated , initialize,setError,showDetail,hideDetail,showConfirmationMessage,setDeleted } = populationUiSlice.actions;
export default populationUiSlice.reducer;


