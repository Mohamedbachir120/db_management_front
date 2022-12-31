import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {store } from './../../app/store';
export class AuthState{
    constructor (isAuthenticated:boolean,token:string,username:string,id:number)  {
        this.isAuthenticated = isAuthenticated;
        this.token = token;
        this.username = username;
        this.id = id;
    }
   
    isAuthenticated:boolean;
    token:string;
    username:string;
    id:number;
}

const initialState:AuthState = {
    isAuthenticated: localStorage.getItem("token") != null ,
    token: localStorage.getItem("token") ?? "",
    username: localStorage.getItem("username") ?? "",
    id: localStorage.getItem("id") != null ? parseInt(localStorage.getItem("id")!) : 0,
  
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials (state, action: PayloadAction<AuthState>)  {
            
            
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('id', action.payload.id.toString());
            return action.payload;
        },
        signOut (state)  {
            
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('id');
            state.isAuthenticated = false;
            state.token = "";
            state.username="";
            state.id = 0;    
                        
            return state;
        },
        
    }
})

export const { setCredentials , signOut } = authSlice.actions;
export default authSlice.reducer;


