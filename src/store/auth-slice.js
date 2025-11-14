import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    token:"",
    email:"",
    isLoggedIn:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.email = action.payload.email;

        },
        logout:(state)=>{

        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;